import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    signupError: null,
    loginError:null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.signupError = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
