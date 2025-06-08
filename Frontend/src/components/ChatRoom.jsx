import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import './main.css';

const socket = io('https://live-chat-app-backend-gsb6.onrender.com', {
  transports: ['websocket'],
  withCredentials: true
});
const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (roomId) {
      socket.emit('joinRoom', roomId);
      console.log(`Joined room: ${roomId}`);

      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('receiveMessage', (messageData) => {
        setMessages((prevMessages) => {
          const exists = prevMessages.find(msg => msg.id === messageData.id);
          if (!exists) {
            return [...prevMessages, messageData];
          }
          return prevMessages;
        });
      });

      return () => {
        socket.emit('leaveRoom', roomId);
        socket.off('connect');
        socket.off('disconnect');
        socket.off('receiveMessage');
      };
    }
  }, [roomId, user, navigate]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      id: Date.now(),
      roomId,
      message,
      senderId: user._id,
    };

    socket.emit('sendMessage', messageData);

    setMessage('');
  };

  const handleLeaveChat = () => {
    socket.emit('leaveRoom', roomId);
    navigate('/home');
  };

  return (
    <div className='mainpg'>
      <div className="chat-page">
        <h3>Chat Room</h3>
        <p>Ask your friend to join with Room ID: {roomId}</p>
        <div className='chat-room'>
          {messages.map((msg) => (
            <div className='msg' key={msg.id}>
              <strong>{msg.sender}</strong>: {msg.message}
            </div>
          ))}
        </div>
        <div className='send-msg'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        <button className='leave-chat' onClick={handleLeaveChat}>Leave Chat</button>
      </div>
    </div>
  );
};

export default ChatRoom;
