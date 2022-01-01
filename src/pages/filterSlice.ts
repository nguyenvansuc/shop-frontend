import { createSlice } from '@reduxjs/toolkit';
import { Filter } from '../interfaces/interface';

const initialState: { filter: Filter } = {
  filter: { title: null, category: null, sale: 'noSale' },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { getFilter } = filterSlice.actions;

export default filterSlice.reducer;
