import usePopularMovies from "../hooks/usePopularMovies.jsx"
import Header from "./Header"
import MainContainer from "./mainContainer";
import SecondaryContainer from "./secondaryContainer";
import useTopRated from "../hooks/useTopRated.jsx";
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx";
import useNowPlaying from "../hooks/useNowPlaying.jsx";




const Browse = () => {
  usePopularMovies();
  useTopRated();
  useUpcomingMovies();
  useNowPlaying();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
     
    </div>
  )
}

// Main Container-
//  -VideoTitle/Overview
//  -Videobackground
// Secondary Container
//  -movie *n
//  -card *n
 

 

export default Browse