import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PromptForm = ({ onSubmit, prompt, setPrompt, loading: externalLoading = false }) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = externalLoading || internalLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    setInternalLoading(true);
    try {
      await onSubmit(prompt);
      setPrompt('');
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center gap-4"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
        Generate Your AI Image
      </h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt to generate an image..."
        className="w-full px-6 py-3 rounded-xl bg-[#1a1a1a] text-white placeholder-gray-400 outline-none border border-neutral-700 focus:border-[#ff4a1c] transition-all duration-300"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[#ff4a1c] text-white px-6 py-3 mt-5
           rounded-xl font-medium hover:brightness-110 active:scale-95 transition-all duration-300 shadow-lg shadow-[#ff4a1c]/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Synthesizing Image...' : 'Generate AI Image'}
      </button>

      {loading && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="w-10 h-10 border-4 border-[#ff4a1c] border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
    </form>
  );
};

export default PromptForm;
