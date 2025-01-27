import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRated } from "../utils/movieSlice";
const useTopRated = () => {
const dispatch = useDispatch();   
const getMovies = async()=>{

    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1',API_OPTIONS)
    const topRated = await data.json();
    dispatch(addTopRated(topRated.results));
    
    }

useEffect(() => {
  getMovies();
}, [])

}

export default useTopRated;
