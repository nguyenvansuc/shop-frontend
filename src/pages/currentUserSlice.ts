import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const checkSignedIn = (): boolean => {
  if (localStorage.getItem('token')) return true;
  return false;
};

const getCurrentUser = () => {
  //   var localStorage: any;
  const token = localStorage?.getItem('token');
  if (token) {
    var userDecoded = jwt_decode(token);
    return userDecoded;
  }
  return null;
};

const initialState = {
  isSignedIn: checkSignedIn(),
  currentUser: getCurrentUser(),
};

export const currentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isSignedIn = action.payload.isSignedIn;
      state.currentUser = action.payload.currentUser;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
