import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {
  const popularMovies = useSelector((store)=>store.movies?.popularMovies)
  const topRated = useSelector((store)=>store.movies?.topRated)
  const nowPlaying = useSelector((store)=>store.movies?.nowPlaying)
  const upcoming = useSelector((store)=>store.movies?.upcoming)
  return (
    <div className="bg-black text-white">
      <div className="mt-0 md:-mt-32 lg:-mt-52 xl:-mt-80 relative z-20 pl-4 md:pl-12">
        <MovieList title="Now Playing" movies={nowPlaying} />
        <MovieList title="Popular Movies" movies={popularMovies} />
        <MovieList title="Top Rated" movies={topRated} />
        <MovieList title="Upcoming" movies={upcoming} />
      </div>
    </div>
  );
};

/*
movielist
moviecard
*/

export default SecondaryContainer