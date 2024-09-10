import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Thunk for creating an event
export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const formData = new FormData();  // Create a new FormData instance
      formData.append('banner', eventData.banner[0]);  // Assuming `banner` is an array with the file

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
      
      // Now create the event with the file URL
      const response = await fetch(`${apiUrl}/api/protected/events`, {
        method: 'POST',
        body: JSON.stringify({ ...eventData, banner: `${apiUrl}${fileUrl}` }), // Include the file URL in the event data
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

// Thunk for fetching organizer's events
export const fetchOrganizerEvents = createAsyncThunk(
  'event/fetchOrganizerEvents',
  async (organizerId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/protected/events/organizer/${organizerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Fetching organizer events failed');
      }
      
      return data;  // Return the fetched events
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    event: null,
    organizerEvents: [],  
    isLoading: false,
    error: null,
  },
  reducers: {
    resetEvent(state) {
      state.event = null;
    },
    resetOrganizerEvents(state) {
      state.organizerEvents = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle event creation
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
      })

      // Handle fetching organizer's events
      .addCase(fetchOrganizerEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizerEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organizerEvents = action.payload;  // Store the organizer's events
      })
      .addCase(fetchOrganizerEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;

export const { resetEvent, resetOrganizerEvents } = eventSlice.actions;
