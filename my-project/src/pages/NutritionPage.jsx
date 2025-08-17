import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSearch, FiBarChart2, FiInfo } from 'react-icons/fi';
import { FaAppleAlt, FaHamburger, FaCarrot, FaDrumstickBite } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NutritionPage = ({ darkMode }) => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Sample food database
  const foodDatabase = [
    { id: 1, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, icon: <FaAppleAlt className="text-red-400" /> },
    { id: 2, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, icon: <FaDrumstickBite className="text-amber-600" /> },
    { id: 3, name: 'Burger', calories: 354, protein: 16, carbs: 29, fat: 19, icon: <FaHamburger className="text-yellow-600" /> },
    { id: 4, name: 'Carrot', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, icon: <FaCarrot className="text-orange-500" /> },
  ];

  // Calculate nutrition totals
  const nutritionData = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fat: acc.fat + meal.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Add meal to daily log
  const addMeal = (food) => {
    const newMeals = [...meals, { ...food, id: Date.now() }];
    setMeals(newMeals);
    setSelectedMeal(null);
    toast.success(`${food.name} added to your meals!`, {
      position: "top-right",
      autoClose: 3000,
      theme: darkMode ? "dark" : "light",
    });
  };

  // Remove meal from daily log
  const removeMeal = (id) => {
    const mealToRemove = meals.find(meal => meal.id === id);
    const updatedMeals = meals.filter(meal => meal.id !== id);
    setMeals(updatedMeals);
    toast.error(`${mealToRemove.name} removed from your meals`, {
      position: "top-right",
      autoClose: 3000,
      theme: darkMode ? "dark" : "light",
    });
  };

  // Filter food based on search
  const filteredFoods = foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <ToastContainer />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Nutrition Tracker</h1>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your daily food intake and nutrition
          </p>
        </div>
        
        {/* Nutrition Summary */}
        <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
            <FiBarChart2 className="mr-2" /> Daily Nutrition
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className="text-xs sm:text-sm font-medium">Calories</p>
              <p className="text-xl sm:text-2xl font-bold">{nutritionData.calories}</p>
              <p className="text-xs">kcal</p>
            </div>
            <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className="text-xs sm:text-sm font-medium">Protein</p>
              <p className="text-xl sm:text-2xl font-bold">{nutritionData.protein.toFixed(1)}</p>
              <p className="text-xs">grams</p>
            </div>
            <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
              <p className="text-xs sm:text-sm font-medium">Carbs</p>
              <p className="text-xl sm:text-2xl font-bold">{nutritionData.carbs.toFixed(1)}</p>
              <p className="text-xs">grams</p>
            </div>
            <div className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
              <p className="text-xs sm:text-sm font-medium">Fat</p>
              <p className="text-xl sm:text-2xl font-bold">{nutritionData.fat.toFixed(1)}</p>
              <p className="text-xs">grams</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Food Search */}
          <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'} lg:col-span-1`}>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
              <FiSearch className="mr-2" /> Search Foods
            </h2>
            <div className="relative mb-3 sm:mb-4">
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div className="max-h-64 sm:max-h-96 overflow-y-auto">
              {filteredFoods.length > 0 ? (
                filteredFoods.map(food => (
                  <div 
                    key={food.id} 
                    onClick={() => setSelectedMeal(food)}
                    className={`p-2 sm:p-3 mb-2 rounded-lg cursor-pointer flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${selectedMeal?.id === food.id ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                  >
                    <div className="mr-2 sm:mr-3 text-lg sm:text-xl">{food.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base">{food.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{food.calories} kcal</p>
                    </div>
                    <FiPlus className="text-blue-500" />
                  </div>
                ))
              ) : (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No foods found</p>
              )}
            </div>

            {selectedMeal && (
              <button
                onClick={() => addMeal(selectedMeal)}
                className="w-full mt-3 sm:mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center text-sm sm:text-base"
              >
                <FiPlus className="mr-1 sm:mr-2" /> Add to Log
              </button>
            )}
          </div>

          {/* Meal Log */}
          <div className={`rounded-lg sm:rounded-xl p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'} lg:col-span-2`}>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Today's Meals</h2>
            
            {meals.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {meals.map(meal => (
                  <div 
                    key={meal.id} 
                    className={`p-3 sm:p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center`}
                  >
                    <div className="mr-3 sm:mr-4 text-xl sm:text-2xl">{meal.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base">{meal.name}</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                          {meal.calories} kcal
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                          {meal.protein}g protein
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
                          {meal.carbs}g carbs
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                          {meal.fat}g fat
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeMeal(meal.id)}
                      className={`p-1 sm:p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} text-red-500`}
                    >
                      <FiTrash2 className="text-sm sm:text-base" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-6 sm:py-8 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <FiInfo className="mx-auto text-2xl sm:text-3xl mb-2 text-gray-400" />
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No meals logged today</p>
                <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Search and add foods to track your nutrition
                </p>
              </div>
            )}

            {/* Nutrition Tips */}
            <div className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'} border`}>
              <h3 className={`font-medium text-sm sm:text-base mb-1 sm:mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                Nutrition Tip
              </h3>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                {nutritionData.protein < 50 ? "Try to include more protein in your meals for better muscle recovery." :
                 nutritionData.carbs > 200 ? "Consider balancing your carb intake with more vegetables and proteins." :
                 "Great job! Your meals seem well-balanced. Keep it up!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;