import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../utils/uiSlice"; // Added openModal to allow clicking recommendations
import { motion, AnimatePresence } from "framer-motion";
import { OMDB_API_KEY, OMDB_API_URL } from "../utils/constants";
import openai from "../utils/openai";
import { searchMovieOMDB } from "../utils/movieSearchHelper";

const MovieDetailModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, selectedMovie } = useSelector((store) => store.ui);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // New state for related movies
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (selectedMovie) {
      setLoading(true);
      // Fetch details
      fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${selectedMovie.imdbID}&plot=full`)
        .then((res) => res.json())
        .then((data) => {
          setDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
        
      // Fetch Related Movies via GPT
      setLoadingRelated(true);
      setRelatedMovies([]); // Clear previous
      const gptQuery = "Suggest 5 movies similar to " + selectedMovie.Title + ". Only give me names of 5 movies, comma separated. Example: Movie A, Movie B, Movie C";
      
      openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
      }).then(async (gptResults) => {
           if (!gptResults.choices) return;
           const gptMovies = gptResults.choices[0].message.content.split(",");
           
           const promises = gptMovies.map(movie => searchMovieOMDB(movie.trim()));
           const results = await Promise.all(promises);
           // Filter out nulls
           setRelatedMovies(results.filter(m => m !== null));
           setLoadingRelated(false);
      }).catch(err => {
          console.error("GPT Error", err);
          setLoadingRelated(false);
      });

    } else {
        setDetails(null);
        setRelatedMovies([]);
    }
  }, [selectedMovie]); // Dependency on selectedMovie ensures it runs when modal opens/updates

  if (!modalOpen || !selectedMovie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4">
        <motion.div
          layoutId={`movie-${selectedMovie.imdbID}`}
          className="bg-zinc-900 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative shadow-2xl border border-zinc-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {/* Close Button */}
          <button
            onClick={() => dispatch(closeModal())}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-3xl hover:text-red-600 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            &times;
          </button>

          {/* Poster Section */}
          <div className="w-full md:w-1/3 h-48 md:h-auto relative block">
            <img
              src={
                selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={selectedMovie.Title}
              className="w-full h-full object-cover md:object-fill"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 md:hidden"></div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3 p-4 md:p-8 text-white overflow-y-auto custom-scrollbar -mt-12 md:mt-0 relative z-20">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                Loading details...
              </div>
            ) : (
              details && (
                <>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {details.Title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mb-4">
                    <span>{details.Year}</span>
                    <span className="border px-1 rounded border-gray-600">
                      {details.Rated}
                    </span>
                    <span>{details.Runtime}</span>
                    <span className="text-yellow-400 font-bold">
                      ★ {details.imdbRating}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300 italic mb-2 text-sm">
                      {details.Genre}
                    </p>
                    <p className="text-sm md:text-lg leading-relaxed">
                      {details.Plot}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm mb-6">
                    <div>
                      <span className="block text-gray-500">Director</span>
                      <span>{details.Director}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Actors</span>
                      <span>{details.Actors}</span>
                    </div>
                  </div>

                  {/* GPT Related Content */}
                  <div className="border-t border-gray-700 pt-4 mt-6">
                    <h3 className="text-lg md:text-xl font-semibold mb-3 flex items-center gap-2">
                      <span className="text-red-500 font-bold">GPT</span> Related
                      Picks
                    </h3>

                    {loadingRelated ? (
                      <div className="text-gray-500 italic text-sm">
                        Thinking of suggestions...
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {relatedMovies.length > 0 ? (
                          relatedMovies.map((movie) => (
                            <div
                              key={movie.imdbID}
                              className="cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => dispatch(openModal(movie))}
                            >
                              <img
                                src={
                                  movie.Poster !== "N/A"
                                    ? movie.Poster
                                    : "https://via.placeholder.com/150x225"
                                }
                                alt={movie.Title}
                                className="rounded w-full aspect-[2/3] object-cover"
                              />
                              <p className="text-[10px] md:text-xs mt-1 truncate text-gray-400">
                                {movie.Title}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No recommendations found.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </motion.div>
        
        {/* Click outside to close */}
        <div 
            className="absolute inset-0 -z-10"
            onClick={() => dispatch(closeModal())}
        ></div>
      </div>
    </AnimatePresence>
  );
};

export default MovieDetailModal;
