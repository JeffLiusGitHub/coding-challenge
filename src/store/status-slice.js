import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    isLogin:false,
    isOpen:false
  },
  reducers: {
    isLogin(state) {
      state.isLogin = true;
    },
    isLogout(state) {
      state.isLogin = false;
    },
    isOpen(state){
      state.isOpen = true;
    },
    isClose(state){
      state.isOpen = false;
    }
  },
});

export const statusActions = statusSlice.actions;
export const {isLogin,isLogout,isOpen,isClose} = statusSlice.actions;
export default statusSlice;
