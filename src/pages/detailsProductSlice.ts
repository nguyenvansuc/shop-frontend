import { createSlice } from '@reduxjs/toolkit';
import { StateDetailsProduct } from '../interfaces/interface';

const initialState: StateDetailsProduct = {
  product: null,
  isLoading: false,
  id: '',
};

export const detailsProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.isLoading = true;
      //   state.id = action.payload;
    },
    getProductSuccess: (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;
    },
  },
});

export const { getProduct, getProductSuccess } = detailsProductSlice.actions;

export default detailsProductSlice.reducer;
