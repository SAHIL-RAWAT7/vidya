import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaFire,
  FaBullseye,
  FaTrashAlt,
  FaPlus,
  FaEdit,
  FaTrophy,
  FaChartLine,
  FaPlay
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Set to false since we're using dummy data
  const [weeklyProgress, setWeeklyProgress] = useState({
    completed: 0,
    total: 0,
    loading: false
  });
  const [fitnessGoal, setFitnessGoal] = useState("Not set");
  const [personalBest, setPersonalBest] = useState({ exercise: "None", weight: "0 lbs" });
  const [fitnessScore, setFitnessScore] = useState({ score: 0, rating: "Beginner" });
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  // Get user display name (username or email)
  const getDisplayName = () => {
    if (!currentUser) return "User";
    return currentUser.displayName || currentUser.email || "User";
  };

  // Load dummy data instead of making API calls
  useEffect(() => {
    setIsLoading(false); // No loading state needed for dummy data
    setWeeklyProgress({
      completed: 0,
      total: 0,
      loading: false
    });
    setPersonalBest({ exercise: "None", weight: "0 lbs" });
    setFitnessScore({ score: 0, rating: "Beginner" });
    setWorkouts([]);
    setRecentWorkouts([]);
  }, []);

  const handleDelete = () => {
    // No action needed for dummy data
    alert("Delete functionality disabled in demo mode");
  };

  const calculateTotalCalories = () => {
    return 0; // Dummy value
  };

  const getWeeklyChange = () => {
    return "+0 this week"; // Dummy value
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8 text-center sm:text-center"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
            Welcome back, {getDisplayName()}!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Ready to crush your fitness goals today?
          </p>
        </motion.div>

        {/* Weekly Progress */}
        <section className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Weekly Goal Progress</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <span className="font-medium text-sm sm:text-base">
                {weeklyProgress.completed} of {weeklyProgress.total} workouts completed
              </span>
              <div className="w-full sm:w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4">
                <div
                  className="bg-blue-500 h-3 sm:h-4 rounded-full"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Workouts"
            value={0}
            change="+0 this week"
            icon={<FaDumbbell />}
            color="blue"
            loading={false}
            compact
          />
          <StatCard
            title="Calories"
            value={0}
            change="0/day"
            icon={<FaFire />}
            color="orange"
            loading={false}
            compact
          />
          <StatCard
            title="Personal Best"
            value="0 lbs"
            change="None"
            icon={<FaTrophy />}
            color="purple"
            loading={false}
            compact
          />
        </section>

        {/* Goals Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <GoalCard
            title="Primary Goal"
            value="Not set"
            target="Set your fitness goal"
            icon={<FaBullseye />}
            color="red"
            compact
          />
          <GoalCard
            title="Fitness Score"
            value="0/10"
            target="Beginner"
            icon={<FaChartLine />}
            color="yellow"
            compact
          />
        </section>

        {/* Recent Added Exercises */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Recently Added Exercises</h2>
            <Link
              to="/library"
              className="text-sm sm:text-base text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View All
            </Link>
          </div>

          <p className="text-center text-gray-500 dark:text-gray-400 py-8 sm:py-12 italic font-light text-sm sm:text-base">
            No recently added exercises. Add some from the Library!
          </p>
        </motion.section>

        {/* Recent Workouts */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Recent Workouts</h2>
            <Link
              to="/add-workout"
              className="inline-flex items-center gap-1 sm:gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow transition text-sm sm:text-base"
              aria-label="Add new workout"
            >
              <FaPlus size={14} />
              <span>Add Workout</span>
            </Link>
          </div>

          <p className="text-center text-gray-500 dark:text-gray-400 py-8 sm:py-16 italic font-light text-sm sm:text-base">
            No workouts yet. Start by adding one!
          </p>
        </motion.section>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, change, icon, color, loading, compact }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow hover:shadow-md transition"
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className={`${colorMap[color]} p-2 sm:p-3 rounded-full`}>
          {React.cloneElement(icon, { size: compact ? 16 : 20 })}
        </div>
        <h3 className="font-medium text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
          {title}
        </h3>
      </div>
      <div>
        <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold`}>{value}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{change}</p>
      </div>
    </motion.div>
  );
}

// Goal Card Component
function GoalCard({ title, value, target, icon, color, compact }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  };

  return (
    <motion.div
      whileHover={{ scale: compact ? 1.01 : 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow hover:shadow-md transition"
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className={`${colorMap[color]} p-2 sm:p-3 rounded-full`}>
          {React.cloneElement(icon, { size: compact ? 16 : 20 })}
        </div>
        <h3 className="font-medium text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
          {title}
        </h3>
      </div>
      <div>
        <p className={`${compact ? 'text-xl' : 'text-2xl'} font-bold mb-1`}>{value}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{target}</p>
      </div>
    </motion.div>
  );
}

export default Dashboard;