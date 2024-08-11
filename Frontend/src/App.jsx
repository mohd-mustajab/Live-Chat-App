import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import ChatRoomCreation from './components/ChatRoomCreation';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./App.css";

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [username, setUsername] = useState(''); 
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUsername('');
      setCurrentUserId('123');
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!currentUserId ? (
              <>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li className='hide-link' onClick={toggleSidebar}><FaBars /></li>

                <div className="show-link">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/create-room">Create Chat Room</Link></li>
                <li><Link to="/join-room">Join Chat Room</Link></li>
                <li><Link to="/profile">Profile</Link></li></div>
                <li><LogoutButton setCurrentUserId={setCurrentUserId} setUsername={setUsername} /></li>

                {isSidebarVisible && (
                  <div className="sidebar">
                  
                    <li className='cross'><Link  onClick={toggleSidebar}><RxCross2 />
                    </Link></li>
                    <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
                    <li><Link to="/create-room" onClick={toggleSidebar}>Create Chat Room</Link></li>
                    <li><Link to="/join-room" onClick={toggleSidebar}>Join Chat Room</Link></li>
                    <li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
                  </div>
                )}
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login setCurrentUserId={setCurrentUserId} setUsername={setUsername} />} />
          <Route path="/home" element={<Home username={username} />} />
          <Route path="/create-room" element={<ChatRoomCreation />} />
          <Route
            path="/join-room"
            element={
              <JoinRoom
                setCurrentRoomId={setCurrentRoomId}
                setCurrentUserId={setCurrentUserId}
                setUsername={setUsername}
              />
            }
          />
          <Route
            path="/room/:roomId"
            element={<ChatRoom roomId={currentRoomId} userId={currentUserId} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};


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
    <button  onClick={handleLogout}>Logout</button>
  );
};


export default App;
