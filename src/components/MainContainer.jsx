import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const MainContainer = () => {
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  
  if (!popularMovies)
    return (
      <div className="bg-black w-screen aspect-video pt-[35%] md:pt-[20%] px-6 md:px-24 text-white text-lg md:text-xl flex justify-center">
        Loading Movies...
      </div>
    );

  const mainMovie = popularMovies[0];
  const { Title, Year, Poster } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle
        title={Title}
        overview={`Released in ${Year}. A popular movie in our collection.`}
        movie={mainMovie}
      />
      <VideoBackground movieTitle={Title} poster={Poster} />
    </div>
  );
};

export default MainContainer