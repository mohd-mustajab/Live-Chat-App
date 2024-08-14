import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://live-chat-app-backend-gsb6.onrender.com/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className='mainpg'>
      <div className="container">
      <h1>User Profile</h1>
      <div className="icon"></div>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
    </div>
    </div>
  );
};

export default Profile;
