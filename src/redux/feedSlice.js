import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addFeed : (state,action) => action.payload,
        removeSingleFromFeed : (state,action) => {
            const newArr = state.filter(val => val._id !== action.payload)
            return newArr;
        },
        removeFeed : (state,action) => null
    }
})

export const {addFeed,removeFeed,removeSingleFromFeed} = feedSlice.actions;

export default feedSlice.reducer;