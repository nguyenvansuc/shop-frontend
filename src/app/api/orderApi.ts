import axiosClient from './axiosClient';
import { Order } from '../../interfaces/interface';

const orderApi = {
  createOrder: async (params: Order) => {
    try {
      const response = await axiosClient.post('/order/create', params);
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
  getMyOrders: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosClient.get('/order/myOrders', {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
  deleteOrder: async (idOrder?: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosClient.delete(`/order/delete/${idOrder}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
  acceptOrder: async (idOrder?: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosClient.get(`/order/accept/${idOrder}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default orderApi;
