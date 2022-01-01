import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../app/api/productApi';
import { Product } from '../interfaces/interface';
export const fetchAllProducts = createAsyncThunk(
  'fetchAllProducts',
  async (filter: any) => {
    const response = await productApi.getAllProducts(filter);
    return response;
  }
);

interface state {
  listProducts: Product[] | [];
  isLoading: boolean;
  error: any;
}

const initialState: state = {
  listProducts: [],
  isLoading: false,
  error: '',
};
export const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listProducts = action.payload.products;
    });
    builder.addCase(
      fetchAllProducts.rejected,
      (state, action: { payload: any }) => {
        state.isLoading = false;
        state.error = action.payload.error;
      }
    );
  },
});

export default allProductsSlice.reducer;
