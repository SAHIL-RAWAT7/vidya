import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Exercise name is required'],
    trim: true,
    maxlength: [50, 'Exercise name cannot exceed 50 characters']
  },
  sets: { 
    type: Number, 
    min: [1, 'Sets must be at least 1'],
    default: 3 
  },
  reps: { 
    type: Number, 
    min: [1, 'Reps must be at least 1'],
    default: 10 
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative'],
    default: 0,
    set: v => parseFloat(v.toFixed(2)) // Store weights with 2 decimal places
  },
  duration: {  // Duration in seconds
    type: Number,
    min: [1, 'Duration must be at least 1 second'],
    default: 1800, // 30 minutes in seconds
    validate: {
      validator: Number.isInteger,
      message: 'Duration must be a whole number of seconds'
    }
  },
  caloriesBurned: {
    type: Number,
    min: [0, 'Calories cannot be negative'],
    default: 0
  },
  videoUrl: { 
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please enter a valid URL']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, { 
  _id: false,
  timestamps: true 
});

const daySchema = new mongoose.Schema({
  dayNumber: { 
    type: Number, 
    required: [true, 'Day number is required'],
    min: [1, 'Day number must be at least 1']
  },
  name: {
    type: String,
    required: [true, 'Day name is required'],
    trim: true,
    maxlength: [50, 'Day name cannot exceed 50 characters']
  },
  exercises: [exerciseSchema],
  totalDuration: {  // Total duration in seconds
    type: Number,
    default: 0,
    min: [0, 'Duration cannot be negative']
  },
  totalCalories: {
    type: Number,
    default: 0,
    min: [0, 'Calories cannot be negative']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { _id: false });

// Calculate day totals before saving
daySchema.pre('save', function(next) {
  this.totalDuration = this.exercises.reduce((sum, ex) => sum + (ex.duration || 0), 0);
  this.totalCalories = this.exercises.reduce((sum, ex) => sum + (ex.caloriesBurned || 0), 0);
  this.completed = this.exercises.length > 0 && this.exercises.every(ex => ex.sets && ex.reps);
  next();
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    index: true
  },
  planName: {
    type: String,
    required: [true, 'Workout plan name is required'],
    trim: true,
    maxlength: [100, 'Plan name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  days: [daySchema],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalDuration: {  // Total duration in seconds
    type: Number,
    default: 0,
    min: [0, 'Duration cannot be negative']
  },
  totalCalories: {
    type: Number,
    default: 0,
    min: [0, 'Calories cannot be negative']
  },
  completedSessions: {
    type: Number,
    default: 0,
    min: [0, 'Completed sessions cannot be negative']
  },
  lastCompleted: {
    type: Date
  },
  tags: {
    type: [String],
    enum: ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Recovery', 'Custom'],
    default: ['Strength']
  }
}, { 
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Calculate workout totals before saving
workoutSchema.pre('save', function(next) {
  this.totalDuration = this.days.reduce((sum, day) => sum + day.totalDuration, 0);
  this.totalCalories = this.days.reduce((sum, day) => sum + day.totalCalories, 0);
  this.completedSessions = this.days.filter(day => day.completed).length;
  
  // Update lastCompleted if any day was completed
  if (this.days.some(day => day.completed)) {
    this.lastCompleted = new Date();
  }
  
  next();
});

// Virtual for formatted duration (hh:mm:ss)
workoutSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.totalDuration / 3600);
  const minutes = Math.floor((this.totalDuration % 3600) / 60);
  const seconds = this.totalDuration % 60;
  
  return [
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    `${seconds}s`
  ].filter(Boolean).join(' ');
});

// Virtual for completion percentage
workoutSchema.virtual('completionPercentage').get(function() {
  return this.days.length > 0 
    ? Math.round((this.completedSessions / this.days.length) * 100)
    : 0;
});

// Indexes for better query performance
workoutSchema.index({ user: 1, lastCompleted: -1 });
workoutSchema.index({ user: 1, isActive: 1 });

// Static Methods ==============================================

/**
 * Get comprehensive dashboard stats for a user
 * @param {ObjectId} userId - The user's ID
 * @returns {Object} Dashboard statistics
 */
workoutSchema.statics.getDashboardStats = async function(userId) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const results = await this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $facet: {
        weeklyProgress: [
          { $match: { lastCompleted: { $gte: oneWeekAgo } } },
          { $count: 'completed' }
        ],
        personalBest: [
          { $unwind: '$days' },
          { $unwind: '$days.exercises' },
          { $sort: { 'days.exercises.weight': -1 } },
          { $limit: 1 },
          { $project: { 
              exercise: '$days.exercises.name',
              weight: '$days.exercises.weight',
              date: '$lastCompleted'
            } 
          }
        ],
        totals: [
          { $group: { 
              _id: null,
              totalWorkouts: { $sum: 1 },
              totalCalories: { $sum: '$totalCalories' },
              totalDuration: { $sum: '$totalDuration' }
            } 
          }
        ],
        weeklyCalories: [
          { $match: { lastCompleted: { $gte: oneWeekAgo } } },
          { $group: { 
              _id: null,
              calories: { $sum: '$totalCalories' }
            } 
          }
        ],
        recentWorkouts: [
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
          { $project: { 
              planName: 1,
              days: 1,
              totalDuration: 1,
              totalCalories: 1,
              lastCompleted: 1,
              completionPercentage: 1
            } 
          }
        ]
      }
    }
  ]);

  // Format the results
  return {
    weeklyProgress: {
      completed: results[0].weeklyProgress[0]?.completed || 0,
      total: 4 // Default weekly target
    },
    personalBest: results[0].personalBest[0] || { 
      exercise: 'Deadlift', 
      weight: 0 
    },
    totals: results[0].totals[0] || {
      totalWorkouts: 0,
      totalCalories: 0,
      totalDuration: 0
    },
    weeklyCalories: results[0].weeklyCalories[0]?.calories || 0,
    recentWorkouts: results[0].recentWorkouts || []
  };
};

/**
 * Get personal best records for all exercise types
 * @param {ObjectId} userId - The user's ID
 * @returns {Array} Personal best records
 */
workoutSchema.statics.getPersonalBests = async function(userId) {
  return this.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userId) } },
    { $unwind: '$days' },
    { $unwind: '$days.exercises' },
    { $sort: { 'days.exercises.weight': -1 } },
    { $group: {
        _id: '$days.exercises.name',
        weight: { $max: '$days.exercises.weight' },
        date: { $first: '$lastCompleted' }
      }
    },
    { $project: {
        exercise: '$_id',
        weight: 1,
        date: 1,
        _id: 0
      }
    }
  ]);
};

/**
 * Get workout history with pagination
 * @param {ObjectId} userId - The user's ID
 * @param {Object} options - Pagination options
 * @returns {Object} Paginated workout history
 */
workoutSchema.statics.getWorkoutHistory = async function(userId, options = {}) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  const [workouts, total] = await Promise.all([
    this.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments({ user: userId })
  ]);

  return {
    data: workouts,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  };
};

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;