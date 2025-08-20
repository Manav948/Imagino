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
    setPrompt(text) // copy suggestion directly into input field
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-20 px-6">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        <Lightbulb className="w-7 h-7 text-yellow-400" />
        Try These Suggestions
      </h2>

      {/* Grid of suggestion cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {suggestions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            onClick={() => handleClick(item)}
            className="relative p-5 rounded-2xl cursor-pointer
              backdrop-blur-lg border border-white/20 
              bg-gradient-to-br from-white/10 via-white/5 to-white/0 
              shadow-lg transition-all duration-300 
              hover:scale-[1.03] hover:shadow-[0_0_25px_#a855f7]/50"
          >
            {/* Glass glow accents */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent opacity-30 blur-xl pointer-events-none" />

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
