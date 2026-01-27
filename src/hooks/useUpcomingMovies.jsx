import { useEffect } from "react";
import { OMDB_API_KEY, OMDB_API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcoming } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    try {
      const data = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=Star Wars&type=movie`);
      const json = await data.json();
      if(json.Search){
        dispatch(addUpcoming(json.Search));
      }
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
};

export default useUpcomingMovies;
