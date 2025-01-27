import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcoming } from "../utils/movieSlice";
const useUpcomingMovies = () => {
const dispatch = useDispatch();   
const getMovies = async()=>{

    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1',API_OPTIONS)
    const upcoming= await data.json();
    dispatch(addUpcoming(upcoming.results));
    
    }

useEffect(() => {
  getMovies();
}, [])

}

export default useUpcomingMovies;
