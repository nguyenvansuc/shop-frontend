import axiosClient from './axiosClient';
import { UserSignIn } from '../../interfaces/interface';

const productApi = {
  async getUser(params: UserSignIn) {
    const response = await axiosClient.post('/user/signIn', params);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  async createUser(params: UserSignIn) {
    const response = await axiosClient.post('/user/signUp', params);
    if (response.data) {
      return response.data;
    }
    return response;
  },
};

export default productApi;
