import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <img
        src="https://avatars.githubusercontent.com/u/583231?v=4" // You can replace this with user image in future
        alt="Profile"
        className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-500 mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Profile</h1>
      <p className="text-md md:text-lg text-gray-300">
        Profile features <span className="text-blue-400 font-semibold">coming soon!</span> You'll be able to update your info, view your activity, and more.
      </p>
    </motion.div>
  );
};

export default Profile;
