import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    isLogin:false
  },
  reducers: {
    isLogin(state) {
      state.isLogin = true;
    },
    isLogout(state) {
      state.isLogin = false;
    },
  },
});

export const statusActions = statusSlice.actions;
export const {isLogin,isLogout} = statusSlice.actions;
export default statusSlice;
