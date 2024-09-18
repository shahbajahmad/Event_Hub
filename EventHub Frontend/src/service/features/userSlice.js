import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deepPurple } from "@mui/material/colors";



const apiUrl = import.meta.env.VITE_API_BASE_URL;
export const fetchUser = createAsyncThunk(
  "userProfile/fetchUser",
  async (userData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await fetch(`${apiUrl}/api/protected/users/${userData?._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "userProfile/updateUser",
  async (updatedUserData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await fetch(
        `${apiUrl}/api/protected/users/${updatedUserData?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(updatedUserData),
        }
      );
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
export const deleteUser = createAsyncThunk(
  "userProfile/deleteUser",
  async (userId, { getState, rejectWithValue,dispatch }) => {
    const { auth } = getState();
    const token = auth.token;
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }
      dispatch(fetchAllUsers())
      return { userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllUsers = createAsyncThunk(
  "userProfile/fetchAllUsers",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await fetch(`${apiUrl}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
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

const userSlice = createSlice({
  name: "userProfile",
  initialState:  {
  isLoading: false,
  avatarColor: deepPurple[500],
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  error: null,
  users:[]
},
  reducers: {
    setavatarColor(state, action) {
      state.avatarColor = action.payload;
    },
    resetUser(state) {
      state.user = null; // Set user to null when logged out
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = state.user?._id === action.payload.userId ? null : state.user;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // Assuming you store all users in 'users' state
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setavatarColor,resetUser } = userSlice.actions;
export default userSlice.reducer;
