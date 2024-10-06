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
import PrivateRoute from './components/PrivateRoute';
import "./App.css";

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [username, setUsername] = useState(''); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUsername('');
      setCurrentUserId('123'); 
      setIsAuthenticated(true); 
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
            <Login setCurrentUserId={setCurrentUserId} setUsername={setUsername} setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home username={username} />
            </PrivateRoute>
          }
        />
        <Route path="/create-room" element={ 
            <PrivateRoute isAuthenticated={isAuthenticated}><ChatRoomCreation />
            </PrivateRoute>} />
        <Route
          path="/join-room"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
            <JoinRoom
              setCurrentRoomId={setCurrentRoomId}
              setCurrentUserId={setCurrentUserId}
              setUsername={setUsername}
            /></PrivateRoute>
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

const ConditionalNavbar = ({ currentUserId, setCurrentUserId, setUsername }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';
  const isChatRoomPage = location.pathname.startsWith('/room/');

  if (isLoginPage || isRegisterPage || isChatRoomPage) {
    return null;
  }

  return <Navbar setCurrentUserId={setCurrentUserId} setUsername={setUsername} />;
};

export default App;
