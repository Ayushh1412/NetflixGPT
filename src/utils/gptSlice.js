import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt",
    initialState:{
        gpt : false,
        movieResults: null,
        movieNames: null
    },
    reducers:{
        setGpt(state){
            state.gpt = !state.gpt;
        },
        addGptMovieResult(state, action) {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    }
})
export const { setGpt, addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;