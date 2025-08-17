import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound({ darkMode }) {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`text-center p-8 sm:p-10 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md max-w-md w-full`}>
        <h1 className={`text-5xl sm:text-6xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          404
        </h1>
        <h2 className={`text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Page Not Found
        </h2>
        <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <button
          onClick={() => navigate('/')}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;