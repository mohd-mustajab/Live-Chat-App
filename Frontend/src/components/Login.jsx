import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './main.css'

const Login = ({ setCurrentUserId, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post('https://live-chat-app-backend-gsb6.onrender.com/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful');
      const { username, userId } = response.data;
      setUsername(username);
      setCurrentUserId(userId);
      navigate('/home');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged In",
        showConfirmButton: false,
        timer: 1000
      });

    } catch (error) {
      console.error('Login error:', error.response || error.message || error);
      Swal.fire({
        icon: "error",
        title: "Try Again",
        text: `${error.response?.data?.message || error.message}`,
      });
    }
  };

  return (
    <div className='mainpg'>
      <h1>Login to your Account..</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;