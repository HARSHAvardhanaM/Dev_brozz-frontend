import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import feedSlice from './feedSlice'
import connectionSlice from "./connectionSlice"
import connectionReqSlice from "./connetionReq"

const store = configureStore({
    reducer : {
        user : authReducer,
        feed : feedSlice,
        connections : connectionSlice,
        connectionReq : connectionReqSlice
    }
});

export default store;