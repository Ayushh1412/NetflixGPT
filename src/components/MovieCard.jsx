

import { useDispatch } from "react-redux";
import { openModal } from "../utils/uiSlice";
import { motion } from "framer-motion";

const MovieCard = ({movie}) => {
   const dispatch = useDispatch();
   const poster = movie.Poster;
   if(poster === 'N/A') return null;

  return (
    <motion.div
      className="w-28 md:w-40 pr-4 md:pr-8 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      onClick={() => dispatch(openModal(movie))}
      layoutId={`movie-${movie.imdbID}`}
    >
      <img className="rounded-lg w-full" src={poster} alt="poster" />
    </motion.div>
  );
};

export default MovieCard