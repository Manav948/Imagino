"use client"
import React from "react"
import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"

const suggestions = [
  "A futuristic cyberpunk city at night, neon lights glowing",
  "A cozy cabin in the snowy mountains with northern lights",
  "Surreal dreamscape with floating islands and waterfalls",
  "Ultra realistic portrait of a medieval knight in battle",
  "A mystical forest with glowing mushrooms and fairies",
]

const Suggestion = ({ setPrompt }) => {
  const handleClick = (text) => {
    setPrompt(text)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-20 px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-950" />

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        <Lightbulb className="w-8 h-8 text-yellow-400" />
        Try These Suggestions
      </h2>

      {/* Card Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {suggestions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            onClick={() => handleClick(item)}
            className="relative rounded-3xl bg-gradient-to-br from-[#ffffff0a] via-[#ffffff10] to-[#ffffff05]
              backdrop-blur-md shadow-xl border border-white/10 
              p-6 md:p-10 w-full max-w-md z-10 cursor-pointer
              hover:scale-105 transition-transform duration-300 overflow-hidden"
          >
            {/* Floating glowing orbs (animated) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-tr from-teal-400 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -right-12 w-36 h-36 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-3xl opacity-30"
            />
            <motion.div
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-14 w-28 h-28 bg-gradient-to-tr from-pink-400 via-fuchsia-500 to-violet-600 rounded-full blur-3xl opacity-25"
            />

            {/* Content */}
            <p className="relative z-10 text-white text-sm md:text-base font-medium leading-relaxed">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Suggestion
