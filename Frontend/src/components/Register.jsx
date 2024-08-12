import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import './main.css';
import Swal from 'sweetalert2'


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://live-chat-app-backend-gsb6.onrender.com/auth/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: ("Registered successfully"),
        showConfirmButton: false,
        timer: 1000
      });
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/')
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <>  <nav>
    <ul>
   
        <>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      
    </ul>
</nav>
    <div className='mainpg'>
      <h1>Register new account...</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
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
      <button onClick={handleRegister}>Register</button>
    </div>
    </>
  );
};

export default Register;
