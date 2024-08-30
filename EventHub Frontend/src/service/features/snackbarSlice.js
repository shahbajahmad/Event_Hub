import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false, 
  message: '', 
  severity: 'success', 
  vertical: 'top', 
  horizontal: 'center',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action) {
    
      const { message, severity = 'success' } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity;
    },
    hideSnackbar(state) {
      state.open = false;
    },
    setPosition(state, action) {
      const { vertical = 'top', horizontal = 'right' } = action.payload;
      state.vertical = vertical;
      state.horizontal = horizontal;
    },
    resetPosition(state) {
       vertical = 'top'; horizontal = 'right' ;
      state.vertical = vertical;
      state.horizontal = horizontal;
    },
  },
});

export const { resetPosition,showSnackbar, hideSnackbar, setPosition } = snackbarSlice.actions;
export default snackbarSlice.reducer;
