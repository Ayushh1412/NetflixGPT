

const MovieCard = ({movie}) => {
   const  poster = movie.poster_path
    

  return (
    <div className="rounded hover:scale-95 transition-all">
       <div className="w-40  ml-6 rounded ">
        <img className="rounded-xl " src={"https://image.tmdb.org/t/p/w500/"+poster} alt="poster"/>
       </div>
        </div>
  )
}

export default MovieCard