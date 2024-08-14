import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './main.css';
import Swal from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://live-chat-app-backend-gsb6.onrender.com/auth/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registered successfully",
        showConfirmButton: false,
        timer: 1000
      });
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <nav>
        <ul>
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        </ul>
      </nav>
      <div className='mainpg'>
        <div className="login-container">
        <h1>Register new account...</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          disabled={isLoading} 
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={isLoading} 
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={isLoading} 
        />
        <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
      </div>
    </>
  );
};

export default Register;
