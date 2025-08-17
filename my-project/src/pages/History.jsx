import React, { useState } from 'react';
import { FaCalendarAlt, FaDumbbell, FaFire, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function History() {
  // Sample data - replace with real data from your backend
  const [workoutHistory, setWorkoutHistory] = useState([
    {
      id: 1,
      date: '2023-05-15',
      name: 'Upper Body Strength',
      duration: '45 min',
      exercises: [
        { name: 'Bench Press', sets: 3, reps: 10, weight: '135 lbs' },
        { name: 'Shoulder Press', sets: 3, reps: 12, weight: '50 lbs' },
        { name: 'Bicep Curls', sets: 3, reps: 12, weight: '30 lbs' },
        { name: 'Tricep Dips', sets: 3, reps: 15, weight: 'Bodyweight' },
        { name: 'Pull-ups', sets: 3, reps: 8, weight: 'Bodyweight' }
      ],
      calories: 320,
      notes: 'Felt strong today, increased weight on bench press',
      expanded: false
    },
    {
      id: 2,
      date: '2023-05-14',
      name: 'HIIT Cardio',
      duration: '30 min',
      exercises: [
        { name: 'Jump Rope', sets: 5, reps: '1 min', weight: 'Bodyweight' },
        { name: 'Burpees', sets: 5, reps: 15, weight: 'Bodyweight' },
        { name: 'Mountain Climbers', sets: 5, reps: '30 sec', weight: 'Bodyweight' },
        { name: 'Box Jumps', sets: 5, reps: 10, weight: 'Bodyweight' }
      ],
      calories: 450,
      notes: 'High intensity session, completed all rounds',
      expanded: false
    },
    {
      id: 3,
      date: '2023-05-12',
      name: 'Leg Day',
      duration: '50 min',
      exercises: [
        { name: 'Squats', sets: 4, reps: 10, weight: '185 lbs' },
        { name: 'Deadlifts', sets: 4, reps: 8, weight: '225 lbs' },
        { name: 'Lunges', sets: 3, reps: 12, weight: '40 lbs' },
        { name: 'Leg Press', sets: 3, reps: 12, weight: '270 lbs' },
        { name: 'Calf Raises', sets: 3, reps: 15, weight: '90 lbs' },
        { name: 'Leg Curls', sets: 3, reps: 12, weight: '80 lbs' }
      ],
      calories: 380,
      notes: 'Focus on form for deadlifts',
      expanded: false
    },
  ]);

  const toggleExpand = (id) => {
    setWorkoutHistory(workoutHistory.map(workout => 
      workout.id === id ? { ...workout, expanded: !workout.expanded } : workout
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Responsive Page Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Workout History</h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
            Track your past workouts and progress
          </p>
        </div>

        {/* Workout History List */}
        <div className="space-y-4 sm:space-y-6">
          {workoutHistory.length > 0 ? (
            workoutHistory.map((workout) => (
              <div 
                key={workout.id}
                className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{workout.name}</h2>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                      <FaCalendarAlt className="mr-1" />
                      <span>{new Date(workout.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                    Completed
                  </span>
                </div>

                {/* Stats Grid - Stack on mobile, side-by-side on larger screens */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center">
                    <div className="p-1 sm:p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mr-2 sm:mr-3">
                      <FaDumbbell className="text-xs sm:text-sm" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Exercises</div>
                      <div className="font-semibold text-sm sm:text-base">{workout.exercises.length}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-1 sm:p-2 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 mr-2 sm:mr-3">
                      <FaFire className="text-xs sm:text-sm" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Calories</div>
                      <div className="font-semibold text-sm sm:text-base">{workout.calories} kcal</div>
                    </div>
                  </div>

                  <div className="flex items-center col-span-2 sm:col-span-1">
                    <div className="p-1 sm:p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-2 sm:mr-3">
                      <FaClock className="text-xs sm:text-sm" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Duration</div>
                      <div className="font-semibold text-sm sm:text-base">{workout.duration}</div>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button 
                  onClick={() => toggleExpand(workout.id)}
                  className="mt-3 sm:mt-4 flex items-center justify-between w-full text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm font-medium"
                >
                  <span>View Details</span>
                  {workout.expanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {/* Expanded Details */}
                {workout.expanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Exercises</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm sm:text-base">{exercise.name}</span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {exercise.sets} sets × {exercise.reps} reps
                            </span>
                          </div>
                          {exercise.weight && (
                            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Weight: {exercise.weight}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {workout.notes && (
                      <div className="mt-4">
                        <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Notes</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          {workout.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <FaCalendarAlt className="h-10 sm:h-12 w-10 sm:w-12 text-gray-400 dark:text-gray-500 mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium mb-1">
                No workout history yet
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 max-w-xs">
                Your completed workouts will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;