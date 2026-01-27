import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {
  const popularMovies = useSelector((store)=>store.movies?.popularMovies)
  const topRated = useSelector((store)=>store.movies?.topRated)
  const nowPlaying = useSelector((store)=>store.movies?.nowPlaying)
  const upcoming = useSelector((store)=>store.movies?.upcoming)
  return (
    <div className="from-black  bg-gradient-to-b to-slate-800 -mt-5 text-white">
      <div className=" lg:-mt-[400px] md:-mt-64 sm:-mt-24">
      <MovieList title="Now Playing" movies={nowPlaying} />
      <MovieList title="Popular Movies" movies={popularMovies} />
      <MovieList title="Top Rated" movies={topRated} />
      <MovieList title="Upcoming" movies={upcoming} />
      </div>
     
    </div>
  )
}

/*
movielist
moviecard
*/

export default SecondaryContainer