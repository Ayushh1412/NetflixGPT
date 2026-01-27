import { useEffect } from "react"
import { addTrailerVideo } from "../utils/movieSlice"
import { useDispatch } from "react-redux"
import { YOUTUBE_API_KEY } from "../utils/constants";

const useTrailerVideo = (movieTitle) => {
    const dispatch = useDispatch();
     
    const getVideoTrailer = async() => {
        if(!movieTitle) return;
        
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle + " trailer")}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
            );
            const json = await response.json();
            
            if (json.items && json.items.length > 0) {
                const videoId = json.items[0].id.videoId;
                dispatch(addTrailerVideo({ key: videoId }));
            }
        } catch (error) {
            console.error("Error fetching trailer from YouTube API:", error);
        }
    }

    useEffect(()=>{
        getVideoTrailer()
    },[movieTitle])
  
}

export default useTrailerVideo