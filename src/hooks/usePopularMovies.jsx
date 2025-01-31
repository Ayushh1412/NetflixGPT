import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
const usePopularMovies = () => {
const dispatch = useDispatch();   
const getMovies = async()=>{

    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',API_OPTIONS)
    const popularMovies = await data.json();
    dispatch(addPopularMovies(popularMovies.results));
    
    }

useEffect(() => {
  getMovies();
}, [])

}

export default usePopularMovies;
