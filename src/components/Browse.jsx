import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies.jsx"
import Header from "./Header"
import MainContainer from "./mainContainer";
import SecondaryContainer from "./secondaryContainer";




const Browse = () => {
const popularMovies = useSelector((store)=>store.movies?.popularMovies)
  usePopularMovies();

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