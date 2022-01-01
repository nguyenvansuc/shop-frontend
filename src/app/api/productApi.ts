import { ProductAdd } from '../../interfaces/interface';
import axiosClient from './axiosClient';

const productApi = {
  async addProduct(params: ProductAdd) {
    console.log(params, 'add');
    const response = await axiosClient.post('/product/add', params);
    if (response.data) {
      return response.data;
    }
    return response;
  },
  async getAllProducts(params: any) {
    try {
      var qs = require('qs');
      const response = await axiosClient.get('/product/allProducts', {
        params: {
          ...params,
        },
        paramsSerializer: (params) => {
          //ví dụ với trường hợp size=[1,2] => &size=1&size=2
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
  async getDetailsProduct(params: any) {
    try {
      const response = await axiosClient.get(`/product/details/${params}`);
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
  async deleteProduct(idProduct: string) {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosClient.delete(
        `/product/delete/${idProduct}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) return response.data;
      return response;
    } catch (error) {
      return error;
    }
  },
};
export default productApi;
