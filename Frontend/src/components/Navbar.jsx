import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const userName = user?.name || user?.email?.split('@')[0] || user?.username || 'User'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-0 w-full z-50 px-4 md:px-8"
    >
      {/* Floating Capsule */}
      <div className="max-w-6xl mx-auto bg-[#0d0d0d]/90 backdrop-blur-md border border-neutral-800 rounded-full py-2.5 px-6 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Left Side: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded bg-[#ff4a1c] flex items-center justify-center font-black text-black text-xl tracking-tighter">
            I
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#ff4a1c] transition-colors">
            imagino
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors" to="/">Home</Link>
          <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors" to="/generate">Playground</Link>
          {user && (
            <Link className="text-sm font-medium text-neutral-400 hover:text-white transition-colors" to="/profile">Profile</Link>
          )}
        </nav>

        {/* Right Side: Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="text-xs text-neutral-400 text-right">
                <div>
                  Welcome <span className="text-[#ff4a1c] font-semibold">{userName}</span>
                </div>
                <div>
                  Credits <span className="text-green-500 font-semibold">{user.imageCount}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-1.5 text-xs font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white rounded-full transition-colors active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <span className="text-sm font-semibold text-neutral-300 hover:text-white cursor-pointer px-3 py-1.5">
                  Sign In
                </span>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 text-xs font-semibold bg-[#ff4a1c] text-white rounded-full hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_12px_rgba(255,74,28,0.2)]">
                  Register ➜
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none text-xl"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-6xl mx-auto bg-[#0d0d0d] border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl"
          >
            <Link onClick={() => setMenuOpen(false)} className="text-base text-neutral-300 hover:text-white py-1" to="/">Home</Link>
            <Link onClick={() => setMenuOpen(false)} className="text-base text-neutral-300 hover:text-white py-1" to="/generate">Playground</Link>
            {user && (
              <Link onClick={() => setMenuOpen(false)} className="text-base text-neutral-300 hover:text-white py-1" to="/profile">Profile</Link>
            )}

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
              {user ? (
                <>
                  <div className="text-xs text-neutral-400">
                    Welcome <span className="text-[#ff4a1c]">{userName}</span>
                    <span className="mx-2">•</span>
                    Credits: <span className="text-green-500">{user.imageCount}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white rounded-full transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex w-full justify-between items-center gap-3">
                  <Link onClick={() => setMenuOpen(false)} to="/signin" className="w-1/2">
                    <button className="w-full py-2.5 text-xs font-semibold text-center text-neutral-300 border border-neutral-800 rounded-full">
                      Sign In
                    </button>
                  </Link>
                  <Link onClick={() => setMenuOpen(false)} to="/signup" className="w-1/2">
                    <button className="w-full py-2.5 text-xs font-semibold text-center bg-[#ff4a1c] text-white rounded-full">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
