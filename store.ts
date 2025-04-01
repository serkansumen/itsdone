// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // Kendi reducer'larınızı import edin

const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... diğer reducer'larınız
  },
});

// RootState ve AppDispatch türlerini export edin:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
