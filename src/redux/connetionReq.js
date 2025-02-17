import { createSlice } from "@reduxjs/toolkit";

const connectionReqSlice = createSlice({
    name : "Connection Request",
    initialState : null,
    reducers : {
        addConnectionRequest : (state,action)=> action.payload,
        removeConnectionReq : (state,action) => {
            console.log(action.payload)
            const newArr = state.filter(req => req._id!==action.payload);
            return newArr
        }
    }
})

export const {addConnectionRequest,removeConnectionReq} = connectionReqSlice.actions;
export default connectionReqSlice.reducer; 