import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Component/Header.jsx'
import NavBar from './Component/NavBar.jsx'
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
      <Header />
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/landing" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
