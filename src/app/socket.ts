import io from 'socket.io-client';
const socketIo = io('https://shop-socket.herokuapp.com');
export default socketIo;
