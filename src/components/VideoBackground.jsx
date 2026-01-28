import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo"
import { useState } from "react";

const VideoBackground = ({ movieTitle, poster }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  useTrailerVideo(movieTitle);
  const trailerVideoKey = useSelector(
    (store) => store.movies?.trailerVideo?.key
  );

  return (
    <div className="w-full h-full">
      <img
        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`}
        src={poster}
        alt={movieTitle}
      />
      {trailerVideoKey && (
        <iframe
          className="w-full h-full"
          src={
            "https://www.youtube.com/embed/" +
            trailerVideoKey +
            "?autoplay=1&mute=1&loop=1&playlist=" +
            trailerVideoKey +
            "&rel=0&controls=0&showinfo=0"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setTimeout(() => setVideoLoaded(true), 2000)}
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground