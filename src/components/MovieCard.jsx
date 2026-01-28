

import { useDispatch } from "react-redux";
import { openModal } from "../utils/uiSlice";
import { motion } from "framer-motion";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const poster = movie.Poster;

  if (poster === "N/A" || !poster || imageError) return null;

  return (
    <div className="w-28 md:w-40 pr-4 md:pr-8 cursor-pointer relative">
      <motion.div
        whileHover={{ scale: 1.1, zIndex: 50 }}
        transition={{ duration: 0.3 }}
        onClick={() => dispatch(openModal(movie))}
        layoutId={`movie-${movie.imdbID}`}
        className="relative"
      >
        <img
          className="rounded-lg w-full"
          src={poster}
          alt="poster"
          onError={() => setImageError(true)}
        />
      </motion.div>
    </div>
  );
};

export default MovieCard