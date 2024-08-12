import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './main.css'
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Navbar = ({ setCurrentUserId, setUsername }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <nav>
      <>
      <ul>
        <li className='hide-link' onClick={toggleSidebar}><FaBars /></li>

        <div className="show-link">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/create-room">Create Chat Room</Link></li>
          <li><Link to="/join-room">Join Chat Room</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </div>
        <li><LogoutButton setCurrentUserId={setCurrentUserId} setUsername={setUsername} /></li>
        </ul>
        {isSidebarVisible && (
          <div className="sidebar">
            <li className='cross'><Link onClick={toggleSidebar}><RxCross2 /></Link></li>
            <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
            <li><Link to="/create-room" onClick={toggleSidebar}>Create Chat Room</Link></li>
            <li><Link to="/join-room" onClick={toggleSidebar}>Join Chat Room</Link></li>
            <li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
          </div>
        )}
      </>
    </nav>
  )
}

// LogoutButton Component
const LogoutButton = ({ setCurrentUserId, setUsername }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUserId(null); 
    setUsername(''); 
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Navbar;
