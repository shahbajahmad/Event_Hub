import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deepPurple } from "@mui/material/colors";

export const fetchUser = createAsyncThunk(
  "userProfile/fetchUser",
  async (userData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    if (!token) return rejectWithValue("No token available");

    try {
      const response = await fetch(`${apiUrl}/api/users/${userData?._id}`, {
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
      return data.user;
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
        `${apiUrl}/api/users/${updatedUserData?._id}`,
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
    
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  avatarColor: deepPurple[500],
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
};
const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setavatarColor(state, action) {
      state.avatarColor = action.payload;
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
        // Optionally update localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setavatarColor } = userSlice.actions;
export default userSlice.reducer;
