import { useEffect } from "react";
import { OMDB_API_KEY, OMDB_API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    try {
      const data = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=Avengers&type=movie`);
      const json = await data.json();
      if(json.Search) {
        dispatch(addPopularMovies(json.Search));
      }
    } catch (error) {
        console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
};

export default usePopularMovies;
