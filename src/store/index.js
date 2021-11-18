import { configureStore } from '@reduxjs/toolkit';

import sessionSlice from './session-slice';
import statusSlice from './status-slice'

const store = configureStore({
  reducer: { session: sessionSlice.reducer,status:statusSlice.reducer},
});

export default store;
