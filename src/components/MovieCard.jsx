

import { useDispatch } from "react-redux";
import { openModal } from "../utils/uiSlice";
import { motion } from "framer-motion";

const MovieCard = ({movie}) => {
   const dispatch = useDispatch();
   const poster = movie.Poster;
   if(poster === 'N/A') return null;

  return (
    <motion.div 
        className="rounded hover:scale-105 transition-all cursor-pointer"
        onClick={() => dispatch(openModal(movie))}
        layoutId={`movie-${movie.imdbID}`}
    >
       <div className="w-40 ml-6 rounded">
        <img className="rounded-xl" src={poster} alt="poster"/>
       </div>
    </motion.div>
  )
}

export default MovieCard