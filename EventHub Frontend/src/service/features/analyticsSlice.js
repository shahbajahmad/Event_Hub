import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL (you might need to adjust this depending on your setup)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Async thunk to fetch analytics data
export const fetchAnalytics = createAsyncThunk('analytics/fetchAnalytics', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/protected/analytics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to update analytics data
export const updateAnalytics = createAsyncThunk('analytics/updateAnalytics', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/protected/analytics/update`,  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to update analytics data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create analytics slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAnalyticsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch analytics
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update analytics
      .addCase(updateAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reset error action
export const { resetAnalyticsError } = analyticsSlice.actions;

// Export the reducer to be used in store
export default analyticsSlice.reducer;
