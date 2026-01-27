import { useEffect } from "react";
import { OMDB_API_KEY, OMDB_API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRated } from "../utils/movieSlice";

const useTopRated = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    try {
      const data = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=Harry Potter&type=movie`);
      const json = await data.json();
      if(json.Search) {
          dispatch(addTopRated(json.Search));
      }
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
};

export default useTopRated;
