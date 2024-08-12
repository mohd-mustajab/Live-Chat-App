import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ChatRoomCreation from './components/ChatRoomCreation';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import Navbar from './components/Navbar';
import "./App.css";

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [username, setUsername] = useState(''); 
  const [currentRoomId, setCurrentRoomId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate fetching user details
      setUsername('');
      setCurrentUserId('123');
    }
  }, []);

  return (
    <Router>
      <ConditionalNavbar
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        setUsername={setUsername}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Login setCurrentUserId={setCurrentUserId} setUsername={setUsername} />
          }
        />
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
    </Router>
  );
};

//when login and register page showing the navbar will be invisible
const ConditionalNavbar = ({ currentUserId, setCurrentUserId, setUsername }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';
  if (isLoginPage || isRegisterPage) {
    return null;
  }

  return <Navbar setCurrentUserId={setCurrentUserId} setUsername={setUsername} />;
};

export default App;
