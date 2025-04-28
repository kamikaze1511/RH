import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Members from './components/Members';
import Login from './components/Login';
import RegisterResearcher from './components/RegisterResearcher';
import RegisterStudent from './components/RegisterStudent';
import Footer from './components/Footer';
import MembersPage from './components/MembersPage';
import UniversityPage from './components/UniversityPage';
import JournalsPage from './components/JournalsPage';
import AboutPage from "./components/AboutPage";
import Profile from "./components/Profile";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with Navbar and Footer */}
        <Route  path="/"  element={
            <>
              <Navbar />
              <div className="main-content">
                <Hero />
                <Members />
              </div>
              <Footer />
            </>
          } 
        />
        
        {/* Other pages without Navbar and Footer */}
        <Route path="/register-researcher" element={<RegisterResearcher />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/university" element={<UniversityPage />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
