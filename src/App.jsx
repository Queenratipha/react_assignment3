import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Component/Footer.jsx'
import Login from './Component/Login.jsx'
import SignUp from './Component/SignUp.jsx'
import Dashboard from './Component/Dashboard.jsx'
import ProtectedRoute from './Component/ProtectedRoute.jsx'
import HomeRedirect from './Component/HomeRedirect.jsx'
import LandingPage from './Component/LandingPage.jsx'
import About from './Component/About.jsx'
import Contact from './Component/Contact.jsx'
import './App.css'

function App() {
  
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
