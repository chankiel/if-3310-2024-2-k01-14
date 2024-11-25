import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import SkillDetails from './pages/SkillDetails'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/feed" replace/>}/>
            <Route path="/home" element={<Navigate to="/feed" replace/>}/>
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/profile/:userId/details/skills" element={<SkillDetails />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
      </Router>
    </>
  )
}