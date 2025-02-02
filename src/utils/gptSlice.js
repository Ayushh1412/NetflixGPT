import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt",
    initialState:{
        gpt : false
    },
    reducers:{
        setGpt(state){
            state.gpt = !state.gpt;
        }
    }
})
export const { setGpt } = gptSlice.actions;
export default gptSlice.reducer;