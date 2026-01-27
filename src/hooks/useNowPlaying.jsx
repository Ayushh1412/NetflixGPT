import { useEffect } from "react";
import { OMDB_API_KEY, OMDB_API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlaying } from "../utils/movieSlice";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    try {
      const data = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=Marvel&type=movie`);
      const json = await data.json();
      if(json.Search) {
          dispatch(addNowPlaying(json.Search));
      }
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
};

export default useNowPlaying;
