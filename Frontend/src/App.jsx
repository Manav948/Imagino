import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Generate from './pages/Generate'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import History from './pages/History'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generate' element={<Generate />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </div>
  )
}

export default App
