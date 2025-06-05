const { Server } = require('socket.io');
const User = require('./models/User'); // adjust path if needed

// Utility to get username by userId
const getUserNameById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user ? user.username : 'Unknown User';
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    return 'Unknown User';
  }
};

// Initialize socket server
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'https://live-chat-app-7np2.onrender.com', // ✅ Frontend URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`🟢 User ${socket.id} joined room ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`🔴 User ${socket.id} left room ${roomId}`);
    });

    socket.on('sendMessage', async ({ id, roomId, message, senderId }) => {
      try {
        const username = await getUserNameById(senderId);
        const messageData = {
          id, // client-generated timestamp-based ID
          message,
          sender: username,
        };
        io.to(roomId).emit('receiveMessage', messageData);
        console.log(`${username} in room ${roomId}: ${message}`);
      } catch (error) {
        console.error('Error handling sendMessage:', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = initializeSocket;
