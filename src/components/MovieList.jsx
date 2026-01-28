import MovieCard from "./MovieCard"

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-2 md:px-6">
      <h1 className="text-xl md:text-3xl py-4 text-white font-semibold">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {movies &&
            movies.map((movie, index) => (
              <MovieCard key={movie.imdbID + "-" + index} movie={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList