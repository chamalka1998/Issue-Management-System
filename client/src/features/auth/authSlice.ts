import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies
import type { LoginCredentials } from '../../types';
import { BASE_URL } from '../../config';

// 1. Check if a user cookie already exists
const userFromCookie = Cookies.get('user') 
  ? JSON.parse(Cookies.get('user')!) 
  : null;

// Login Thunk
export const login = createAsyncThunk('auth/login', async (userData: LoginCredentials) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, userData);
  
  // 2. Save to cookie on successful login (expires in 7 days)
  Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
  
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: userFromCookie, // 3. Set initial state from the cookie
    loading: false 
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      // 4. Remove cookie on logout
      Cookies.remove('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;