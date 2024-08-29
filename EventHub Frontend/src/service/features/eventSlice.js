// features/event/eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const formData = new FormData();  // Create a new FormData instance
      formData.append('banner', eventData.banner[0]);  // Assuming `banner` is an array with the file
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const uploadResponse = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json();
        return rejectWithValue(uploadError.error || 'File upload failed');
      }

      const fileData = await uploadResponse.json();
      const fileUrl = fileData.url;  // Extract the file URL from the upload response
      console.log(eventData)
      // Now create the event with the file URL
      const response = await fetch(`${apiUrl}/api/events`, {
        method: 'POST',
        body: JSON.stringify({ ...eventData, banner: fileUrl }), // Include the file URL in the event data
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Event creation failed');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    event: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
