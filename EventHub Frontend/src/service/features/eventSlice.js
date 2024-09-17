import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Thunk for creating an event
export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const formData = new FormData();  // Create a new FormData instance
      formData.append('banner', eventData.banner[0]);  // Assuming `banner` is an array with the file

      const uploadResponse = await fetch(`${apiUrl}/service/upload`, {
        method: 'POST',
        body: formData,
        headers:{ Authorization: `Bearer ${ localStorage.getItem('token')}`,}
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
export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ eventId, eventData,uploadImage }, { rejectWithValue,dispatch }) => {
    try {
      
      if (uploadImage == "Yes") {
        const formData = new FormData();  // Create a new FormData instance
      if (eventData.banner && eventData.banner[0]) {
        // Delete the previous banner
      await fetch(`${apiUrl}/service/delete/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        formData.append('banner', eventData.banner[0]);  // Assuming `banner` is an array with the file

        const uploadResponse = await fetch(`${apiUrl}/service/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          return rejectWithValue(uploadError.error || 'File upload failed');
        }

        const fileData = await uploadResponse.json();
        const fileUrl = fileData.url;  // Extract the file URL from the upload response
        eventData.banner = `${apiUrl}${fileUrl}`;  // Include the new file URL in the event data
      }

      }

     
    eventData.ticket_quantity += Number(eventData.ticket_offset)  
    eventData.ticket_quantity_left +=Number(eventData.ticket_offset)  

    // Now update the event with new data
      const response = await fetch(`${apiUrl}/api/protected/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Event update failed');
      }
      dispatch(addEditEvent({...data,ticket_offset:0}))
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllEvents = createAsyncThunk(
  'event/fetchAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/admin/events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Fetching all events failed');
      }
      
      return data;  // Return the fetched events
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const approveEvent = createAsyncThunk(
  'event/approveEvent',
  async (eventId, { rejectWithValue,dispatch }) => {
    try {
      const response = await fetch(`${apiUrl}/admin/events/${eventId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: 'Approved' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Event approval failed');
      } dispatch(fetchAllEvents())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for rejecting event status
export const rejectEvent = createAsyncThunk(
  'event/rejectEvent',
  async (eventId, { rejectWithValue,dispatch }) => {
    try {
      const response = await fetch(`${apiUrl}/admin/events/${eventId}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: 'Reject' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || 'Event rejection failed');
      }
      dispatch(fetchAllEvents())
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting event
export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (eventId, { rejectWithValue,dispatch }) => {
    try {
      await fetch(`${apiUrl}/service/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const response = await fetch(`${apiUrl}/admin/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.error || 'Event deletion failed');
      }
      dispatch(fetchAllEvents())
      return { eventId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const eventSlice = createSlice({
  name: 'event',
  initialState: {
    editEvent:null,
    event: null,
    adminEvents: [],
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
    },
    addEditEvent(state,action) {
      state.editEvent = action.payload;
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
      }) .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })  .addCase(fetchAllEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminEvents = action.payload;  // Store the fetched admin events
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) .addCase(approveEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedEventIndex = state.adminEvents.findIndex(
          event => event._id === action.payload._id
        );
        if (updatedEventIndex !== -1) {
          state.adminEvents[updatedEventIndex] = action.payload;
        }
      })
      .addCase(approveEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle rejecting event status
      .addCase(rejectEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(rejectEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedEventIndex = state.adminEvents.findIndex(
          event => event._id === action.payload._id
        );
        if (updatedEventIndex !== -1) {
          state.adminEvents[updatedEventIndex] = action.payload;
        }
      })
      .addCase(rejectEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle deleting event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminEvents = state.adminEvents.filter(event => event._id !== action.payload.eventId);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;

export const { resetEvent, resetOrganizerEvents,addEditEvent } = eventSlice.actions;
