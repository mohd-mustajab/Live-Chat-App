const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/Chatroom');
const User = require('../models/User');

// Route to create a chat room
router.post('/create', async (req, res) => {
  const { name } = req.body; // Removed userIds

  try {
    if (!name) {
      return res.status(400).json({ message: 'Room name is required' });
    }

    const chatRoom = new ChatRoom({ name });
    await chatRoom.save();

    res.status(201).json({ chatRoomId: chatRoom._id, message: 'Chat room created successfully' });
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat rooms for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const chatRooms = await ChatRoom.find({ users: userId });
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a chat room if all users left
socket.on('leaveRoom', async (roomId) => {
  socket.leave(roomId);

  const chatRoom = await ChatRoom.findById(roomId);
  if (chatRoom) {
    chatRoom.users = chatRoom.users.filter(userId => userId !== socket.id);

    if (chatRoom.users.length === 0) {
      // Here you could use the DELETE route to remove the chat room
      await axios.delete(`https://live-chat-app-backend-gsb6.onrender.com/chatRooms/${roomId}`);
    } else {
      await chatRoom.save();
    }
  }
});


module.exports = router;
