import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Library from '../pages/Library';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import BMI from '../pages/BMI';
import History from '../pages/History';
import AddWorkout from '../pages/AddWorkout';
import NutritionPage from '../pages/NutritionPage';

function AppRoutes({ recentWorkouts, onAddWorkout, onDeleteWorkout, darkMode, setDarkMode }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            recentWorkouts={recentWorkouts}
            onDelete={onDeleteWorkout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            recentWorkouts={recentWorkouts}
            onDelete={onDeleteWorkout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
      />
      <Route path="/library" element={<Library darkMode={darkMode} setDarkMode={setDarkMode} />} />
      <Route path="/bmi" element={<BMI darkMode={darkMode} setDarkMode={setDarkMode} />} />
      <Route path="/history" element={<History darkMode={darkMode} setDarkMode={setDarkMode} />} />
      <Route
        path="/signin"
        element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode} />}
      />
      <Route
        path="/signup"
        element={<SignUp darkMode={darkMode} setDarkMode={setDarkMode} />}
      />
      <Route path="/nutrition" element={<NutritionPage darkMode={darkMode} />} />
      <Route
        path="/add-workout"
        element={<AddWorkout onAddWorkout={onAddWorkout} darkMode={darkMode} setDarkMode={setDarkMode} />}
      />
      <Route path="*" element={<NotFound darkMode={darkMode} setDarkMode={setDarkMode} />} />
    </Routes>
  );
}

export default AppRoutes;
