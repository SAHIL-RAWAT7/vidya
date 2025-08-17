// controllers/workoutController.js
import Workout from '../models/Workout.js';

// @desc    Get dashboard stats
// @route   GET /api/workouts/dashboard
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const [
      weeklyProgress,
      personalBest,
      totalWorkouts,
      recentWorkouts,
      fitnessScore
    ] = await Promise.all([
      Workout.getWeeklyProgress(userId),
      Workout.getPersonalBest(userId),
      Workout.countDocuments({ user: userId }),
      Workout.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      calculateFitnessScore(userId)
    ]);

    // Calculate totals in seconds
    const totalCalories = recentWorkouts.reduce((sum, w) => sum + (w.totalCalories || 0), 0);
    const totalDuration = recentWorkouts.reduce((sum, w) => sum + (w.totalDuration || 0), 0);
    const avgDuration = recentWorkouts.length > 0 
      ? Math.round(totalDuration / recentWorkouts.length)
      : 0;

    res.json({
      weeklyProgress: {
        completed: weeklyProgress.completedWorkouts,
        total: weeklyProgress.targetWorkouts
      },
      stats: {
        totalWorkouts,
        totalCalories,
        avgDuration,
        personalBest: {
          exercise: personalBest.exercise || 'Deadlift',
          weight: personalBest.weight ? `${personalBest.weight} lbs` : '185 lbs'
        }
      },
      fitnessScore,
      recentWorkouts
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard stats',
      error: error.message 
    });
  }
};

// @desc    Get recent 5 workouts
// @route   GET /api/workouts/recent
// @access  Private
export const getRecentWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
      
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching recent workouts',
      error: error.message 
    });
  }
};

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req, res) => {
  try {
    const { planName, days } = req.body;

    const workout = new Workout({
      user: req.user._id,
      planName,
      days
    });

    const createdWorkout = await workout.save();
    res.status(201).json(createdWorkout);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating workout',
      error: error.message
    });
  }
};

// @desc    Get all workouts for user
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workouts',
      error: error.message
    });
  }
};

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout && workout.user.toString() === req.user._id.toString()) {
      res.json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workout',
      error: error.message
    });
  }
};

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private
export const updateWorkout = async (req, res) => {
  try {
    const { planName, days } = req.body;

    const workout = await Workout.findById(req.params.id);

    if (workout && workout.user.toString() === req.user._id.toString()) {
      workout.planName = planName || workout.planName;
      workout.days = days || workout.days;

      const updatedWorkout = await workout.save();
      res.json(updatedWorkout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error updating workout',
      error: error.message
    });
  }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout && workout.user.toString() === req.user._id.toString()) {
      await workout.remove();
      res.json({ message: 'Workout removed' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting workout',
      error: error.message
    });
  }
};

// Helper function to calculate fitness score
const calculateFitnessScore = async (userId) => {
  try {
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const workouts = await Workout.find({
      user: userId,
      lastCompleted: { $gte: oneMonthAgo, $lte: now }
    });

    const workoutCount = workouts.length;
    let score = 0;

    if (workoutCount >= 16) score = 10;
    else if (workoutCount >= 12) score = 8;
    else if (workoutCount >= 8) score = 6;
    else if (workoutCount >= 4) score = 4;
    else score = 2;

    const ratings = [
      "Keep pushing!",
      "Good start!",
      "Making progress!",
      "Great work!",
      "Excellent!",
      "Fitness champion!"
    ];

    const ratingIndex = Math.min(Math.floor(score / 2), ratings.length - 1);
    const rating = ratings[ratingIndex];

    return { 
      score: score.toFixed(1), 
      rating,
      workoutsThisMonth: workoutCount
    };
  } catch (error) {
    return { score: 0, rating: "No data yet", workoutsThisMonth: 0 };
  }
};