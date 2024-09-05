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
router.delete('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log(`Attempting to delete room: ${roomId}`);
    
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      console.log('Room not found');
      return res.status(404).json({ error: 'Chat room not found' });
    }

    if (chatRoom.users.length === 0) {
      console.log('Room is empty, deleting...');
      await chatRoom.remove();
      return res.status(200).json({ message: 'Chat room deleted' });
    } else {
      console.log('Users still present, cannot delete');
      return res.status(400).json({ error: 'Cannot delete chat room, users still present' });
    }
  } catch (error) {
    console.error('Error deleting chat room:', error);
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
