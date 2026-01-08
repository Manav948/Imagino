import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const userName = user?.name || user?.email?.split('@')[0] || 'User'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-gradient-to-r from-gray-900 via-black to-gray-950 shadow-lg shadow-indigo-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          Imagino
        </Link>

        <nav className="hidden sm:flex space-x-6">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/generate">Logo Generate</Link>
          {user && <Link className="nav-link" to="/profile">Profile Pic</Link>}
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            <>
              <div className="text-sm text-white text-right">
                <div>
                  Welcome <span className="text-yellow-300">{userName}</span>
                </div>
                <div>
                  Balance <span className="text-green-400">{user.imageCount}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="btn-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin"><button className="btn-purple">Sign In</button></Link>
              <Link to="/signup"><button className="btn-pink">Sign Up</button></Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-black border-t border-white/10 px-6 py-6 space-y-5"
          >
            <Link onClick={() => setMenuOpen(false)} className="mobile-link" to="/">Home</Link>
            <Link onClick={() => setMenuOpen(false)} className="mobile-link" to="/generate">Logo Generate</Link>

            <div className="pt-4 border-t border-white/10">
              {user ? (
                <>
                  <div className="text-white mb-3">
                    <div>
                      Welcome <span className="text-yellow-300">{userName}</span>
                    </div>
                    <div>
                      Balance <span className="text-green-400">{user.imageCount}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setMenuOpen(false)
                    }}
                    className="w-full btn-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/signin"><button className="w-full btn-purple">Sign In</button></Link>
                  <Link to="/signup"><button className="w-full btn-pink">Sign Up</button></Link>
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
