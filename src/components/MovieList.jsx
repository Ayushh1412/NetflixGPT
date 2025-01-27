import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {
  return (
    <div className=" relative m-4 p-4 z-50  ">
      <h1 className=" p-4 text-3xl text-slate-300 font-mono ">{title}</h1>            

       <div className=" flex no-scrollbar overflow-auto ">
        <div className="flex ">
         { movies && movies.map((movie)=><MovieCard key={movie.id} movie={movie} />) }
        </div>
        
    </div>           
    </div>
  )
}

export default MovieList