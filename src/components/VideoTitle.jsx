const VideoTitle = ({title,overview}) => {
  return (
    <div className=" absolute w-screen h-screen p-16 from-black bg-gradient-to-r">
        <div className="text-5xl font-bold mb-6 mt-[15%] text-white">{title}</div>
        <div className="text-lg text-white mb-4 w-[35%]">{overview}</div>
        <button className="text-white py-4 px-12 bg-slate-400 bg-opacity-50  rounded-lg">  ⫸ Play</button>
        <button className="text-white py-4 px-12 bg-slate-400 ml-4 bg-opacity-50  rounded-lg">More info</button>
    </div>
  )
}

export default VideoTitle