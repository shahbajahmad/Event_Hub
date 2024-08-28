import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "../features/authSlice";
import modalReducer from '../features/modalSlice'; 
import userProfileReducer from '../features/userSlice'; 
const store = configureStore({

    reducer:{
        auth:authReducer,
        modal: modalReducer,
        userDetail:userProfileReducer
    }
});



export default store;


