import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5050',
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosClient;
