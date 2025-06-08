const User = require('./models/User');

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
  });

  socket.on('sendMessage', async (messageData) => {
    try {
      const user = await User.findById(messageData.senderId);
      const messageWithSender = {
        ...messageData,
        sender: user?.username || 'Anonymous',
      };

      io.to(messageData.roomId).emit('receiveMessage', messageWithSender);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
