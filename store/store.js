import { configureStore } from '@reduxjs/toolkit';
import otpReducer from './otpSlice';

const store = configureStore({
  reducer: {
    otp: otpReducer,
  },
});
export default store;