import axios from 'axios';

export const addWorkout = async (workoutData, token) => {
  const response = await fetch('/api/workouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(workoutData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save workout');
  }
  
  return await response.json();
};

export const getWorkouts = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('/api/workouts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
