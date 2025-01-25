import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const MainContainer = () => {
const popularMovies = useSelector((store)=>store.movies?.popularMovies)
if(!popularMovies)return;
const mainMovie = popularMovies[0];
const{title,overview,id} = mainMovie;

  return (
    <div className=" bg-black w-screen h-screen">
        <VideoTitle title={title} overview={overview}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer