import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gradient-to-r from-gray-900 via-black to-gray-950 shadow-lg shadow-indigo-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          Imagino
        </Link>

        {/* Navigation */}
        <nav className="space-x-6 hidden sm:flex">
          <Link
            to="/"
            className="text-gray-300 hover:text-pink-400 font-medium transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            to="/generate"
            className="text-gray-300 hover:text-indigo-400 font-medium transition-colors duration-300"
          >
            Logo-Generate
          </Link>

          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-300"
              >
                Profile Pic
              </Link>

              <Link
                to="/history"
                className="text-gray-300 hover:text-green-400 font-medium transition-colors duration-300"
              >
                History
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons / User Info */}
        <div className="space-x-4 hidden sm:flex items-center">
          {user ? (
            <>
              <div className="text-sm text-white text-right">
                <div className="font-medium">
                  Welcome, <span className="text-yellow-300">{userName}</span>
                </div>
                <div>Balance: <span className="text-green-400">{user.imageCount}</span></div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-md font-semibold bg-gradient-to-r from-green-500 to-yellow-500 text-black rounded-xl shadow-md hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="px-4 py-2 text-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-pink-400/50 hover:scale-105 transition-all duration-300">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 text-md font-semibold bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white rounded-xl shadow-md hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
