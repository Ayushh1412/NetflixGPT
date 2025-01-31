import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo"

const VideoBackground = ({movieId}) => {
    useTrailerVideo(movieId);
    const trailerVideoKey = useSelector((store)=>store.movies?.trailerVideo?.key)
    if(!trailerVideoKey)return

  return (
    <div className="absolute w-screen h-screen z-0 -top-28 ">
        <iframe
         className="w-screen aspect-video " 
         src ={"https://www.youtube.com/embed/"+trailerVideoKey+"?&autoplay=1&mute=1&showinfo=0&controls=0&autohide=1"}
         title="YouTube video player"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         referrerPolicy="strict-origin-when-cross-origin" 
         allowFullScreen>

         </iframe>
    </div>
  )
}

export default VideoBackground