import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWorkout } from '../services/workoutService';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaPlay, FaArrowRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddWorkout() {
  const [planName, setPlanName] = useState('');
  const [days, setDays] = useState([{ day: '', duration: '', exercises: [{ name: '', video: '' }] }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, currentUser } = useAuth();

  const handleAddDay = () => {
    setDays([...days, { day: '', duration: '', exercises: [{ name: '', video: '' }] }]);
  };

  const handleDayChange = (index, field, value) => {
    const updated = [...days];
    updated[index][field] = value;
    setDays(updated);
  };

  const handleExerciseChange = (dayIndex, exIndex, field, value) => {
    const updated = [...days];
    updated[dayIndex].exercises[exIndex][field] = value;
    setDays(updated);
  };

  const handleAddExercise = (dayIndex) => {
    const updated = [...days];
    updated[dayIndex].exercises.push({ name: '', video: '' });
    setDays(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!planName.trim()) {
      toast.error('Please enter a workout plan name');
      return;
    }

    for (let i = 0; i < days.length; i++) {
      if (!days[i].day.trim()) {
        toast.error(`Please enter a title for Day ${i + 1}`);
        return;
      }
      for (let j = 0; j < days[i].exercises.length; j++) {
        if (!days[i].exercises[j].name.trim()) {
          toast.error(`Please enter a name for exercise ${j + 1} in Day ${i + 1}`);
          return;
        }
      }
    }

    setLoading(true);
    
    const newWorkout = {
      planName,
      days: days.map(day => ({
        ...day,
        duration: parseInt(day.duration) || 0,
        exercises: day.exercises.map(ex => ({
          name: ex.name.trim(),
          video: ex.video.trim()
        }))
      })),
      user: currentUser.uid,
      createdAt: new Date().toISOString(),
      totalDuration: days.reduce((sum, day) => sum + (parseInt(day.duration) || 0, 0)),
      totalExercises: days.reduce((sum, day) => sum + day.exercises.length, 0)
    };

    try {
      // Save to backend
      const savedWorkout = await addWorkout(newWorkout, token);
      
      // Update local storage for recent workouts
      const existing = JSON.parse(localStorage.getItem('recentWorkouts')) || [];
      const updated = [{
        ...savedWorkout,
        daysCount: days.length,
        duration: newWorkout.totalDuration
      }, ...existing].slice(0, 5);
      localStorage.setItem('recentWorkouts', JSON.stringify(updated));
      
      // Show success toast
      toast.success('Workout plan created successfully! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate after toast disappears
      setTimeout(() => navigate('/dashboard'), 2000);
      
    } catch (err) {
      console.error('Error saving workout:', err);
      toast.error(`Failed to save workout: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ToastContainer />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header - Responsive */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-1 sm:mb-2">Create Workout Plan</h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 text-center">
            Build your custom workout routine
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Plan Name */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3">Workout Plan Name*</label>
            <input
              type="text"
              placeholder="e.g. Upper Body Strength"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Days - Responsive layout */}
          {days.map((day, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
                <div className="w-full">
                  <label className="block text-base sm:text-lg font-semibold mb-1 sm:mb-2">Day {i + 1} Title*</label>
                  <input
                    type="text"
                    placeholder="e.g. Upper Body"
                    value={day.day}
                    onChange={(e) => handleDayChange(i, 'day', e.target.value)}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div className="w-full sm:w-32">
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Duration (min)*</label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    value={day.duration}
                    onChange={(e) => handleDayChange(i, 'duration', e.target.value)}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    min="1"
                    required
                  />
                </div>
              </div>

              <h3 className="text-sm sm:text-md font-medium mb-2 sm:mb-3">Exercises ({day.exercises.length})*</h3>
              
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                {day.exercises.map((ex, j) => (
                  <div key={j} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-3 gap-2">
                    <input
                      type="text"
                      placeholder="Exercise name*"
                      value={ex.name}
                      onChange={(e) => handleExerciseChange(i, j, 'name', e.target.value)}
                      className="flex-1 w-full p-2 text-sm sm:text-base bg-transparent border-none focus:outline-none"
                      required
                    />
                    <input
                      type="url"
                      placeholder="Video URL (optional)"
                      value={ex.video}
                      onChange={(e) => handleExerciseChange(i, j, 'video', e.target.value)}
                      className="flex-1 w-full sm:ml-2 p-2 text-xs sm:text-sm bg-transparent border-none focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleAddExercise(i)}
                className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm font-medium"
              >
                <FaPlus className="mr-1" /> Add Exercise
              </button>
            </div>
          ))}

          {/* Buttons - Stack on mobile, side-by-side on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleAddDay}
              className="flex-1 py-2 sm:py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition flex items-center justify-center text-sm sm:text-base"
            >
              <FaPlus className="mr-1 sm:mr-2" /> Add Day
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  Save Workout <FaArrowRight className="ml-1 sm:ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorkout;