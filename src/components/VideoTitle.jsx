import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../utils/uiSlice";
import { lang } from "../utils/languageConstants";

const VideoTitle = ({title, overview, movie}) => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const handleMoreInfoButton = () => {
    dispatch(openModal(movie));
  }
  return (
    <div className="absolute w-screen aspect-video pt-[25%] md:pt-[15%] px-6 md:px-16 from-black bg-gradient-to-r z-[5]">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-6 text-white">
        {title}
      </h1>
      <p className="hidden md:inline-block text-sm md:text-base text-white mb-4 w-full md:w-1/2 lg:w-1/3">
        {overview}
      </p>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button className="text-black py-1 md:py-2 px-4 md:px-10 bg-white hover:bg-opacity-80 rounded-md md:rounded-lg flex items-center text-sm md:text-lg">
          <span className="mr-1">⫸</span> {lang[langKey].play}
        </button>
        <button
          className="text-white py-1 md:py-2 px-3 md:px-8 bg-gray-500 bg-opacity-50 rounded-md md:rounded-lg flex items-center text-sm md:text-lg hover:bg-opacity-40"
          onClick={handleMoreInfoButton}
        >
          <span className="mr-1">ⓘ</span> {lang[langKey].moreInfo}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle