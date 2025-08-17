import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      toast.warning('Please enter both weight and height', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const h = height / 100;
    const result = weight / (h * h);
    const roundedBMI = result.toFixed(1);
    setBmi(roundedBMI);

    let cat = '';
    if (result < 18.5) cat = 'Underweight';
    else if (result < 24.9) cat = 'Normal';
    else if (result < 29.9) cat = 'Overweight';
    else cat = 'Obese';

    setCategory(cat);

    toast.success(`Your BMI is ${roundedBMI} (${cat})`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    if (cat === 'Underweight') {
      toast.info('Consider consulting a nutritionist for healthy weight gain', {
        autoClose: 6000,
      });
    } else if (cat === 'Overweight' || cat === 'Obese') {
      toast.warning('Regular exercise and balanced diet can help improve your BMI', {
        autoClose: 6000,
      });
    }
  };

  const getColor = () => {
    switch (category) {
      case 'Underweight': return 'text-yellow-500';
      case 'Normal': return 'text-green-500';
      case 'Overweight': return 'text-orange-500';
      case 'Obese': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Responsive Header */}
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">BMI Calculator</h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
            Calculate your Body Mass Index
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              calculateBMI();
            }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Weight Input */}
            <div>
              <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                min="1"
                required
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Height Input */}
            <div>
              <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm"
                min="30"
                required
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition text-sm sm:text-base"
            >
              Calculate BMI
            </button>
          </form>

          {/* Results - Responsive layout */}
          {bmi && (
            <div className="mt-6 sm:mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Your Results</h3>
                <div className="text-3xl sm:text-4xl font-bold mb-1">{bmi}</div>
                <div className={`text-lg sm:text-xl font-medium ${getColor()}`}>
                  {category}
                </div>
              </div>

              {/* BMI Scale - Stack on mobile, side-by-side on larger screens */}
              <div className="mt-4 sm:mt-6">
                <h4 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">BMI Categories:</h4>
                <div className="grid grid-cols-2 gap-1 sm:flex sm:text-xs">
                  <div className="flex-1 text-center">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-1 text-xs">Underweight</div>
                    <div className="text-xs">&lt; 18.5</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-1 text-xs">Normal</div>
                    <div className="text-xs">18.5 - 24.9</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-orange-100 dark:bg-orange-900 p-1 text-xs">Overweight</div>
                    <div className="text-xs">25 - 29.9</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-red-100 dark:bg-red-900 p-1 text-xs">Obese</div>
                    <div className="text-xs">≥ 30</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BMI;