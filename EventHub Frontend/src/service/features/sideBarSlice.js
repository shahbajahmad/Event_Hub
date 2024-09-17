import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: "dashboard",

};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setActiveTab(state,action){
      state.activePage=action.payload
    }
  },
});

export const {  setActiveTab} = sideBarSlice.actions;
export default sideBarSlice.reducer;
