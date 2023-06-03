import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService, { RegisterData } from './authService';

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Load user from localStorage
const storedUser = localStorage.getItem('mygoals_user');
const user = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register user
export const register = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>('auth/register', async (user: RegisterData, thunkApi) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    console.log(error);

    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error;
    return thunkApi.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? 'An error occurred';
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
