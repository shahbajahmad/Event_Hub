import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "../features/authSlice";
import modalReducer from '../features/modalSlice'; 
import userProfileReducer from '../features/userSlice'; 
import eventReducer from '../features/eventSlice'; 
import snackbarReducer from '../features/snackbarSlice'; 
import analyticsReducer from '../features/analyticsSlice'; 

const store = configureStore({

    reducer:{
        auth:authReducer,
        modal: modalReducer,
        userDetail:userProfileReducer,
        event:eventReducer,
        snackbar:snackbarReducer,
        analytics:analyticsReducer
    }
});



export default store;


