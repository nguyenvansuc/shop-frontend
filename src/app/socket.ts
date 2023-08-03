import io from 'socket.io-client';
const socketIo = io('http://localhost:3001');
export default socketIo;
