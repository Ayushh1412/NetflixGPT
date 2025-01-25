import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"
import { addTrailerVideo } from "../utils/movieSlice"
import { useDispatch } from "react-redux"

const useTrailerVideo = (movieId) => {
    const dispatch = useDispatch();
     
    const getVideoTrailer = async() => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,API_OPTIONS)
        const videos = await data.json()
        const filteredData = videos.results.filter((video)=>video?.type == "Trailer")
        const trailer = filteredData?filteredData[0]:videos[0]
        dispatch(addTrailerVideo(trailer))


    }

    useEffect(()=>{
        getVideoTrailer()
    
    },[])
  
}

export default useTrailerVideo