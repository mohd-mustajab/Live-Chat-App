import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import './main.css';

const socket = io('https://live-chat-app-backend-gsb6.onrender.com');

const ChatRoom = () => {
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', roomId);

      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('receiveMessage', (messageData) => {
        setMessages((prevMessages) => {
          const existingMessageIndex = prevMessages.findIndex(msg => msg.id === messageData.id);
          if (existingMessageIndex === -1) {
            return [...prevMessages, messageData];
          }
          return prevMessages;
        });
      });

      socket.on('roomDeleted', () => {
        alert('The chat room has been deleted because all users left.');
        navigate('/'); // Redirect to home page or any other page after the room is deleted
      });

      return () => {
        socket.emit('leaveRoom', roomId); // Inform the server that the user is leaving the room
        socket.off('connect');
        socket.off('disconnect');
        socket.off('receiveMessage');
        socket.off('roomDeleted');
      };
    }
  }, [roomId, navigate]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        id: Date.now(),
        roomId,
        message,
        senderId: userId,
        sendername:username
      };

      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, { ...messageData, sender: 'You' }]);
      setMessage('');
    }
  };

  const handleLeaveChat = () => {
    alert("Do You want to leave the room")
    navigate('/home'); 
  };

  return (
    <div className='mainpg'>
      <div className="chat-page">
        <h1>Chat Room</h1>
        <p>Ask your friend to join with Room ID: {roomId}</p>
        <div className='chat-room'>
          {messages.map((msg) => (
            <div className='msg' key={msg.id}>
              <strong>{msg.username}</strong>: {msg.message}
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
        <button className='leave-chat' onClick={handleLeaveChat}>Leave Room</button>
        <p>This is a live chat app. Once you refresh the page, the room will vanish.</p>
      </div>
    </div>
  );
};

export default ChatRoom;
