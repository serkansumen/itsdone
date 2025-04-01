// features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types'; // User türünüzü import edin
import authService from './authService'; // authService dosyanızı import edin

// Başlangıç durumu (initial state) için tür tanımı
interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Başlangıç durumu (initial state)
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Giriş yapma işlemi için async thunk
export const loginUser = createAsyncThunk<User, { phoneNumber: string }, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const user = await authService.login({ phoneNumber: credentials.phoneNumber }); // Obje olarak geçirin
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Giriş yapılamadı.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => { //logout için
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Hata mesajını temizle
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        // Tür kontrolü:
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'Bilinmeyen bir hata oluştu.';
        }
        state.user = null; // Kullanıcıyı null yap
      });
  },
});

export const { resetAuth } = authSlice.actions; //logout için
export default authSlice.reducer;
