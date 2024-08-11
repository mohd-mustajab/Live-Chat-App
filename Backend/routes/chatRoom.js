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

// Delete a chat room if all user left
router.delete('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) return res.status(404).json({ error: 'Chat room not found' });

    if (chatRoom.users.length === 0) {
      await chatRoom.remove();
      res.status(200).json({ message: 'Chat room deleted' });
    } else {
      res.status(400).json({ error: 'Cannot delete chat room, users still present' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
