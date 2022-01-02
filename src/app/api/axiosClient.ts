import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://shop-backend-ts.herokuapp.com',
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosClient;
