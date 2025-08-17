import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter as Router, useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import ToastWrapper from "./components/ToastWrapper";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
}

function Footer({ darkMode }) {
  return (
    <footer className={`mt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <FiActivity
                className="mr-3 text-blue-600 dark:text-blue-400"
                size={28}
                style={{ transform: 'translateY(2px)' }}
              />
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-blue-600 dark:text-blue-400">Fit</span>
                <span className="text-gray-800 dark:text-gray-100">Track</span>
                <span className="text-blue-500 dark:text-blue-300 text-3xl leading-4">.</span>
              </span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Empowering your fitness journey with smart tracking and personalized insights.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                <FaFacebookF className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" size={16} />
              </a>
              <a href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                <FaInstagram className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400" size={16} />
              </a>
              <a href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                <FaTwitter className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400" size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/Dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</a></li>
              <li><a href="/Library" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Workouts</a></li>
              <li><a href="/History" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Progress</a></li>
              <li><a href="/nutrition" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Nutrition</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="/guides" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guides</a></li>
              <li><a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="/community" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="/press" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Press</a></li>
              <li><a href="/partners" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className={`mt-16 pt-10 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter for the latest fitness tips, app updates, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} FitTrack. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Accessibility</a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sitemap</a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Status</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AppWrapper({ recentWorkouts, handleAddWorkout, handleDeleteWorkout, darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const prevPathRef = useRef(location.pathname);

  const handleLogoHover = () => {
    navigate('/signin');
  };

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setLoading(true);
      prevPathRef.current = location.pathname;
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onLogoHover={handleLogoHover} 
        />
        
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-8 lg:px-10 py-8">
          {loading ? <LoadingSpinner /> : (
            <AppRoutes
              recentWorkouts={recentWorkouts}
              onAddWorkout={handleAddWorkout}
              onDeleteWorkout={handleDeleteWorkout}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
        </main>

        <Footer darkMode={darkMode} />
        <ToastWrapper />
      </div>
    </div>
  );
}

function App() {
  const [recentWorkouts, setRecentWorkouts] = useState(() => {
    const saved = localStorage.getItem("workouts");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(recentWorkouts));
  }, [recentWorkouts]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAddWorkout = useCallback((workout) => {
    setRecentWorkouts(prev => [workout, ...prev.slice(0, 49)]);
  }, []);

  const handleDeleteWorkout = useCallback((index) => {
    setRecentWorkouts(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <Router>
      <AppWrapper
        recentWorkouts={recentWorkouts}
        handleAddWorkout={handleAddWorkout}
        handleDeleteWorkout={handleDeleteWorkout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </Router>
  );
}

export default App;