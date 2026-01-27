import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {
  return (
    <div className=" relative m-4 p-4 z-50  ">
      <h1 className=" p-4 text-3xl text-slate-300 font-mono ">{title}</h1>            

       <div className=" flex no-scrollbar overflow-x-scroll ">
        <div className="flex h-auto py-4">
         { movies && movies.map((movie, index)=><MovieCard key={movie.imdbID + "-" + index} movie={movie} />) }
        </div>
        
    </div>           
    </div>
  )
}

export default MovieList