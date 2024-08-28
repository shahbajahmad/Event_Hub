import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isLoginForm:true,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    switchtoLoginModal(state) {
        state.isLoginForm = true;
      },
      switchtoSignupModal(state) {
        state.isLoginForm = false;
      },
  },
});

export const { openModal, closeModal,switchtoSignupModal,switchtoLoginModal } = modalSlice.actions;
export default modalSlice.reducer;
