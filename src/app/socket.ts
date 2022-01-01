import io from 'socket.io-client';
const socketIo = io('localhost:8900');
export default socketIo;
