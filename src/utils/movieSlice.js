import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        popularMovies: null,
        topRated: null,
        upcoming:null,
        nowPlaying:null,
        trailerVideo: null
},
    reducers: {
            addPopularMovies(state, action) {
            state.popularMovies = action.payload;
            },
            addNowPlaying(state, action) {
            state.nowPlaying = action.payload;
            },
            addTopRated(state, action) {
            state.topRated = action.payload;
            },
            addUpcoming(state, action) {
            state.upcoming = action.payload;
            },
            addTrailerVideo(state,action){
            state.trailerVideo = action.payload;
            },
            removePopularMovies(state) {
            state.popularMovies = null;
            }
        }
});
export const { addPopularMovies,addNowPlaying,addTopRated,addUpcoming,removePopularMovies,addTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;

