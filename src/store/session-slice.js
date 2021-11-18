import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    username: null,
    fullname: null,
  },
  reducers: {
    changeUserName(state, action) {
      state.username = action.payload;
    },
    changeFullName(state, action) {
      state.fullname = action.payload;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export const {changeFullName,changeUserName} = sessionSlice.actions;
export default sessionSlice;
