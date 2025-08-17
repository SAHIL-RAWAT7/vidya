import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaPlay, FaPlus, FaCheck, FaDumbbell, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Library() {
  const { currentUser } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy exercise data with animated GIFs
  const dummyExercises = [
    {
      id: 1,
      name: "Push-ups",
      type: "Bodyweight",
      category: "Chest",
      description: "A classic upper body exercise that targets chest, shoulders, and triceps.",
      targetMuscles: ["Pectorals", "Deltoids", "Triceps"],
      animation: "https://c.tenor.com/gI-8qCUEko8AAAAC/pushup.gif", // Push-up animation
      difficulty: "Beginner",
      equipment: "None",
      image: "https://th.bing.com/th/id/OIP.1fGday65FxUbbZ978YCBfwHaEj?w=268&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 2,
      name: "Squats",
      type: "Compound",
      category: "Legs",
      description: "Fundamental lower body exercise that builds leg and glute strength.",
      targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
      animation: "https://media1.tenor.com/m/pANVg22G1JAAAAAC/workouts-squats.gif", // Squat animation
      difficulty: "Beginner",
      equipment: "Barbell",
      image: "https://th.bing.com/th/id/OIP.DfVYe9yBliEfs8oMwbnPjwHaE8?w=278&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 3,
      name: "Deadlifts",
      type: "Compound",
      category: "Full Body",
      description: "Works the posterior chain muscles including hamstrings and lower back.",
      targetMuscles: ["Hamstrings", "Glutes", "Lower Back"],
      animation: "https://i.pinimg.com/originals/81/f1/23/81f1230ab56427e0bb86e2b3c2c6cb6f.gif", // Deadlift animation
      difficulty: "Advanced",
      equipment: "Barbell",
      image: "https://th.bing.com/th/id/OIP.dCf4ocAPuh4D9BRma6YqxgHaEv?w=296&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 4,
      name: "Bench Press",
      type: "Compound",
      category: "Chest",
      description: "Primary exercise for developing chest muscles and upper body strength.",
      targetMuscles: ["Pectorals", "Triceps", "Deltoids"],
      animation: "https://media.tenor.com/0hoNLcggDG0AAAAC/bench-press.gif", // Bench press animation
      difficulty: "Intermediate",
      equipment: "Barbell",
      image: "https://th.bing.com/th/id/OIP.fieIYNV4QvwPnpjsdlGyHQHaEK?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 5,
      name: "Pull-ups",
      type: "Bodyweight",
      category: "Back",
      description: "Excellent for building upper body strength, particularly the back muscles.",
      targetMuscles: ["Latissimus Dorsi", "Biceps", "Rear Deltoids"],
      animation: "https://gifdb.com/images/high/spiderman-pull-ups-animation-e5gg8tk8g6tgr0s7.gif", // Pull-up animation
      difficulty: "Intermediate",
      equipment: "Pull-up Bar",
      image: "https://th.bing.com/th/id/OIP.w4Id1YHm_y8CFecJdT0oHgHaFj?w=224&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 6,
      name: "Plank",
      type: "Bodyweight",
      category: "Core",
      description: "Core strengthening exercise that improves stability and endurance.",
      targetMuscles: ["Abs", "Obliques", "Lower Back"],
      animation: "https://th.bing.com/th/id/R.f7979dfc8b43294f480d475e1e823246?rik=FYAaQc%2fVJyDj8A&riu=http%3a%2f%2fmedia-s3-us-east-1.ceros.com%2ffidelity-interactive%2fimages%2f2019%2f04%2f23%2ffa0ba91510838f144dea9eb30cc005a7%2fplanks.gif&ehk=FBd1J%2bb3X8O6vv6UO4a4SOk%2fvLPk9u%2boRkPShVG2eu8%3d&risl=&pid=ImgRaw&r=0", // Plank animation
      difficulty: "Beginner",
      equipment: "None",
      image: "https://th.bing.com/th/id/OIP.b1uf0Y_E3XTXYjAdbZMNNAHaHZ?w=183&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    }
  ];

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setExercises(dummyExercises);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Load recent workouts for current user
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`recentWorkouts_${currentUser.uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setRecentWorkouts(parsed);
        setAddedExercises(parsed.map(ex => ex.id));
      }
    }
  }, [currentUser]);

  // Save recent workouts when they change
  useEffect(() => {
    if (currentUser && recentWorkouts.length > 0) {
      localStorage.setItem(`recentWorkouts_${currentUser.uid}`, JSON.stringify(recentWorkouts));
    }
  }, [recentWorkouts, currentUser]);

  const addToRecentWorkouts = (exercise) => {
    if (!recentWorkouts.find((w) => w.id === exercise.id)) {
      const updated = [exercise, ...recentWorkouts].slice(0, 5);
      setRecentWorkouts(updated);
      setAddedExercises([...addedExercises, exercise.id]);
      toast.success(`${exercise.name} added to recent workouts!`);
    } else {
      toast.info(`${exercise.name} is already in recent workouts`);
    }
  };

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeExerciseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.targetMuscles.some((muscle) =>
        muscle.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            Exercise Library
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
            Browse our collection of exercises with animated demonstrations
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search exercises, muscles, or equipment..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No exercises found matching your search
            </p>
            <button 
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                {/* Exercise Image with Play Button */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={exercise.image} 
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Exercise Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold">{exercise.name}</h2>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      exercise.difficulty === "Beginner" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : exercise.difficulty === "Intermediate" 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {exercise.type}
                    </span>
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {exercise.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exercise.description}
                  </p>

                  {/* Target Muscles */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Target Muscles</h3>
                    <div className="flex flex-wrap gap-2">
                      {exercise.targetMuscles.map((muscle, index) => (
                        <span
                          key={index}
                          className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Equipment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.equipment}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => openExerciseModal(exercise)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      <FaPlay size={12} />
                      View Demo
                    </button>
                    <button
                      onClick={() => addToRecentWorkouts(exercise)}
                      disabled={addedExercises.includes(exercise.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                        addedExercises.includes(exercise.id)
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {addedExercises.includes(exercise.id) ? (
                        <>
                          <FaCheck size={12} />
                          Added
                        </>
                      ) : (
                        <>
                          <FaPlus size={12} />
                          Add to Workout
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise Animation Modal */}
      {showModal && selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold">{selectedExercise.name}</h3>
              <button 
                onClick={closeExerciseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src={selectedExercise.animation} 
                  alt={`${selectedExercise.name} animation`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedExercise.description}
                </p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Difficulty:</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedExercise.difficulty === "Beginner" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : selectedExercise.difficulty === "Intermediate" 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {selectedExercise.difficulty}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Equipment:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedExercise.equipment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => {
                  addToRecentWorkouts(selectedExercise);
                  closeExerciseModal();
                }}
                disabled={addedExercises.includes(selectedExercise.id)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  addedExercises.includes(selectedExercise.id)
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {addedExercises.includes(selectedExercise.id) ? (
                  <>
                    <FaCheck className="inline mr-2" />
                    Already Added
                  </>
                ) : (
                  <>
                    <FaPlus className="inline mr-2" />
                    Add to Workout
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Library;