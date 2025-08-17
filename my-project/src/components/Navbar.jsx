import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiActivity, FiLogOut, FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';

function Navbar({ loading, darkMode, setDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/signin');
    setIsMobileMenuOpen(false);
  };

  const displayName = user?.name?.trim() || user?.email || 'Guest';
  const userInitial = displayName.charAt(0).toUpperCase();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiActivity /> },
    { name: 'Workouts', path: '/library', icon: <FiActivity /> },
    { name: 'Add Workout', path: '/add-workout', icon: <FiActivity /> },
    { name: 'BMI Calculator', path: '/bmi', icon: <FiActivity /> },
    { name: 'Progress', path: '/history', icon: <FiActivity /> },
    { name: 'Nutrition', path: '/nutrition', icon: <FiActivity /> },
  ];

  const linkClass = (path) =>
    `flex items-center px-4 py-3 rounded-lg transition-colors ${
      location.pathname === path
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
    }`;

  return (
    <>
      {loading && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${
          darkMode ? 'bg-gray-900/70' : 'bg-white/70'
        }`}>
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/70 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center focus:outline-none"
              >
                <FiActivity className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
                <span className="text-2xl font-bold tracking-tighter">
                  <span className="text-blue-600 dark:text-blue-400">Fit</span>
                  <span className="text-gray-800 dark:text-gray-100">Track</span>
                  <span className="text-blue-500 dark:text-blue-300 text-3xl leading-4">.</span>
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-yellow-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {user && (
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center rounded-full px-3 py-1 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-100' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-medium ${
                      darkMode 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {userInitial}
                    </div>
                    <span className="ml-2 text-sm whitespace-nowrap">
                      {displayName.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`p-2 transition-colors ${
                      darkMode 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-red-500 hover:text-red-700'
                    }`}
                  >
                    <FiLogOut size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      {!isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/70 dark:border-gray-700/50 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={handleLogoClick}
              className="flex items-center focus:outline-none"
            >
              <FiActivity className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-blue-600 dark:text-blue-400">Fit</span>
                <span className="text-gray-800 dark:text-gray-100">Track</span>
                <span className="text-blue-500 dark:text-blue-300 text-3xl leading-4">.</span>
              </span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-yellow-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-md transition-colors ${
                  darkMode 
                    ? 'text-gray-100 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div className={`relative h-full w-72 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        } shadow-xl flex flex-col`}>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-1 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <FiX className={darkMode ? 'text-gray-300' : 'text-gray-600'} size={20} />
            </button>
          </div>

          {/* User Profile */}
          {user && (
            <div className={`px-4 pb-4 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  darkMode 
                    ? 'bg-blue-900 text-blue-300' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {userInitial}
                </div>
                <div>
                  <div className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Logged in as</div>
                  <div className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>{displayName}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center mx-2 my-1 ${linkClass(link.path)}`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className={`p-4 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-red-400 hover:bg-gray-800 hover:text-red-300' 
                  : 'text-red-500 hover:bg-gray-100 hover:text-red-700'
              }`}
            >
              <FiLogOut className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;