import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import './main.css';

const Navbar = ({ setCurrentUserId, setUsername }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUserId(null);
    setUsername('');
    navigate('/');
  };

  return (
    <header className="navbar">
      <h2 style={{ fontFamily: "Poppins", margin: 0 }}>Live Chat</h2>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <RxCross2 /> : <FaBars />}
      </div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/create-room">Create Chat Room</Link></li>
        <li><Link to="/join-room">Join Chat Room</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="nav-links open">
          <li><Link to="/home" onClick={toggleMobileMenu}>Home</Link></li>
          <li><Link to="/create-room" onClick={toggleMobileMenu}>Create Chat Room</Link></li>
          <li><Link to="/join-room" onClick={toggleMobileMenu}>Join Chat Room</Link></li>
          <li><Link to="/profile" onClick={toggleMobileMenu}>Profile</Link></li>
          <li><button onClick={() => { toggleMobileMenu(); handleLogout(); }}>Logout</button></li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
