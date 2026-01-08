import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Generate from './pages/Generate'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="bg-black overflow-hidden">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generate' element={<Generate />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
