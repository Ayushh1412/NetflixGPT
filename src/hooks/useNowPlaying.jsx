import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlaying } from "../utils/movieSlice";
const useNowPlaying = () => {
const dispatch = useDispatch();   
const getMovies = async()=>{

    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',API_OPTIONS)
    const nowPlaying= await data.json();
    dispatch(addNowPlaying(nowPlaying.results));
    
    }

useEffect(() => {
  getMovies();
}, [])

}

export default useNowPlaying;
