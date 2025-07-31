import React from 'react';
import { motion } from 'framer-motion';

const Generate = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
        Logo Generator
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
        This feature is <span className="text-pink-400 font-semibold">coming soon!</span> We’re working hard to bring you a powerful and creative logo generation tool. Stay tuned.
      </p>
    </motion.div>
  );
};

export default Generate;
