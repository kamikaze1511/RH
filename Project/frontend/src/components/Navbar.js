import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import logo from '../Assets/logo1.jpg';

const Navbar = () => {
  const [isBrowseDropdownOpen, setIsBrowseDropdownOpen] = useState(false);
  const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Researcher Hive Logo" className="logo-image" />
        <span>Researcher Hive</span>
      </div>
      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>

          {/* Browse Dropdown */}
          <li 
            className="dropdown"
            onMouseEnter={() => setIsBrowseDropdownOpen(true)}
            onMouseLeave={() => setIsBrowseDropdownOpen(false)}
          >
            <span className="dropdown-btn">BROWSE</span>
            {isBrowseDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/members">Members</Link></li>
                <li><Link to="/university">University</Link></li>
                <li><Link to="/journals">Journals</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/about">ABOUT</Link></li>
        </ul>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          {/* Register Dropdown */}
          <li>
            <div className="dropdown">
              <button 
                className="register-button" 
                onClick={() => setIsRegisterDropdownOpen(!isRegisterDropdownOpen)}
              >
                REGISTER
              </button>
              {isRegisterDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/register-researcher" className="dropdown-item">As Researcher</Link>
                  <Link to="/register-student" className="dropdown-item">As Student</Link>
                </div>
              )}
            </div>
          </li>
          
          <li><Link to="/login" className="login-button">LOGIN</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
