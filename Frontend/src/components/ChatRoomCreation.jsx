import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const ChatRoomCreation = () => {
  const [name, setName] = useState('');
  const navigate=useNavigate();

  const handleCreateRoom = async () => {
    try {
      if (!name || userIds.length === 0) {
        alert('Room name and at least one user ID are required');
        return;
      }
  
      const response = await axios.post('https://live-chat-app-backend-gsb6.onrender.com/chatRooms/create', { name, userIds });
      const roomId = response.data.chatRoomId;
      console.log('Chat room created with ID:', roomId);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: ('Chat room created'),
        showConfirmButton: false,
        timer: 1500
      });
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error creating chat room:', error.response || error.message || error);
      alert(`Error creating chat room: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='mainpg'>
      <div className="container">
      <h1>Create a ChatRoom</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Room Name" />
      <button onClick={handleCreateRoom}>Create</button>
    </div>
    </div>
  );
};

export default ChatRoomCreation;
