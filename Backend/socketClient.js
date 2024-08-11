import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  withCredentials: true
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from server:', reason);
});

socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
});


export default socket;
