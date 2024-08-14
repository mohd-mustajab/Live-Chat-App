import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = ({ setCurrentRoomId, setCurrentUserId }) => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      setCurrentRoomId(roomId);
      setCurrentUserId('123'); 
      navigate(`/room/${roomId}`);
    } else {
      alert('Please enter a valid Room ID');
    }
  };

  return (
    <div className='mainpg'>
      <div className="container">
      <h1>Join a Chat Room</h1>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
    </div>
  );
};

export default JoinRoom;
