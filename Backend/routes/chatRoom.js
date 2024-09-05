const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/Chatroom');
const User = require('../models/User');

// Route to create a chat room
router.post('/create', async (req, res) => {
  const { name, userIds } = req.body;

  try {
    if (!name || !userIds || userIds.length === 0) {
      return res.status(400).json({ message: 'Room name and at least one user ID are required' });
    }

    const chatRoom = new ChatRoom({ name, userIds });
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

module.exports = router;
