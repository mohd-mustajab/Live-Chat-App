const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv =require('dotenv').config();
const cors = require('cors');
const chatRoomsRouter = require('./routes/chatRoom');
const authRouter = require('./routes/Auth');
const User = require('./models/User');
const app = express();
const server = http.createServer(app);


const io = socketIo(server, {
  cors: {
    origin: 'https://live-chat-app-7np2.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});
const corsOptions = {
  origin: 'https://live-chat-app-7np2.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));


const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

connectdb();

app.use(express.json());


app.use('/chatRooms', chatRoomsRouter);
app.use('/auth', authRouter);


const getUserNameById = async (userId) => {
  try {
    const user = await User.findById(userId).exec();
    return user ? user.username : 'Unknown User';
  } catch (error) {
    console.error('Error fetching username:', error);
    return 'Unknown User';
  }
};


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  
  // Handle sending messages
  socket.on('sendMessage', async (messageData) => {
    const username = await getUserNameById(messageData.senderId);
    const messageToSend = {
      ...messageData,
      sender: username,
    };
    
    io.to(messageData.roomId).emit('receiveMessage', messageToSend);
  });
  
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit('joinedRoom', `User ${socket.id} has joined the room`);
  });


  
  socket.on('disconnect', (reason) => {
    console.log('User disconnected:', socket.id, 'Reason:', reason);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
