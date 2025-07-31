import React, { useState } from 'react';

const PromptForm = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [loading , setLoading]  = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt); // <-- Calls the function passed from Home.jsx
    setPrompt('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mt-20 px-4 flex flex-col items-center gap-4"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
        Generate Your AI Image
      </h1>
      
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt to generate an image..."
        className="w-full px-6 py-3 rounded-xl bg-[#1a1a1a] text-white placeholder-gray-400 outline-none border border-neutral-700 focus:border-blue-600 transition-all duration-300"
      />

       <button
          type='submit'
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-600 text-white px-6 py-3 mt-5
           rounded-xl font-medium hover:brightness-150 transition-all duration-300 shadow-lg shadow-blue-800/50"
        >
          {loading ? 'Generating...' : 'Generate AI Image'}
        </button>
    </form>
  );
};

export default PromptForm;
