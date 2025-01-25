import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        popularMovies: null,
        trailerVideo: null
},
    reducers: {
        addPopularMovies(state, action) {
            state.popularMovies = action.payload;
            },
            addTrailerVideo(state,action){
            state.trailerVideo = action.payload;
            },
            removePopularMovies(state) {
            state.popularMovies = null;
            }
        }
});
export const { addPopularMovies, removePopularMovies,addTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;

