import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './main.css'

const socket = io('https://live-chat-app-backend-gsb6.onrender.com');

const ChatRoom = () => {
  const { roomId } = useParams();
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

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('receiveMessage');
      };
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        id: Date.now(), 
        roomId,
        message,
        senderId: '123',
      };

      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, { ...messageData, sender: 'You' }]);
      setMessage('');
    }
  };

  return (
    <div className='mainpg'>
      <h1>Chat Room</h1>
      <p>Ask your friend to join with Room ID:{roomId}</p>
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
      <p>This a live chat app once you refresh the page the room will vanished.</p>
    </div>
  );
};

export default ChatRoom;
