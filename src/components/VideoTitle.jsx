import { useNavigate } from "react-router-dom"

const VideoTitle = ({title,overview}) => {
  const navigate = useNavigate();

  const handleMoreInfoButton = () => {
    navigate("/MoreInfo")
  }
  return (
    <div className=" absolute w-screen aspect-video p-16 from-black bg-gradient-to-r z-[5]">
        <div className="text-4xl font-bold mb-6 mt-[10%] text-white">{title}</div>
        <div className=" hidden text-base text-white mb-4 w-[35%] lg:block  ">{overview}</div>
        <button className="text-black py-2 px-8 bg-white hover:bg-opacity-80  rounded-lg">  ⫸ Play</button>
        <button className="text-white py-2 px-6 bg-slate-400 ml-4 bg-opacity-50  rounded-lg"
        onClick={handleMoreInfoButton}>ⓘ More Info</button>
    </div>
  )
}

export default VideoTitle