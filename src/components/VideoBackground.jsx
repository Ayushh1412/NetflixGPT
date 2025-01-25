import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo"

const VideoBackground = ({movieId}) => {
    useTrailerVideo(movieId);
    const trailerVideoKey = useSelector((store)=>store.movies?.trailerVideo?.key)
    if(!trailerVideoKey)return

  return (
    <div className=" w-screen h-screen ">
        <iframe
         className="w-screen h-screen " 
         src ={"https://www.youtube.com/embed/"+trailerVideoKey}
         title="YouTube video player"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         referrerPolicy="strict-origin-when-cross-origin" 
         allowFullScreen>

         </iframe>
    </div>
  )
}

export default VideoBackground