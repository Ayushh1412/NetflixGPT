import { BG_IMAGE } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <>
    <div className="absolute -z-30">
            <img
              src = {BG_IMAGE}
              alt="logo"
              className="w-screen min-h-screen scale-125 brightness-0 md:brightness-50"
              />
    </div>
   <div className="flex h-screen justify-center place-items-center  text-white">
    <div className=" relative  grid w-1/2  grid-cols-12">
        <div className="relative col-span-8 -top-4">
        <input 
            type="text"
            // ref={email}
            id="gptSearch"
            className="p-4 my-4 w-full bg-black bg-opacity-5 rounded-md inner-border-2 border-white peer"
            placeholder=" "
            autoComplete="search"
        />
        <label
            htmlFor="gptSearch"
            className="absolute ml-2 mt-3 text-base text-white dark:text-white duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/3 rtl:peer-focus:left-auto"
        >
            What would you like to watch today?
        </label>
        </div>
        <div className="col-span-4 ml-3">
        <button className="bg-red-500 hover:bg-red-700 w-full text-white font-bold  p-4 rounded">
        Search
        </button>
        
      </div>
    </div>
    </div>
    </>
  )
}

export default GptSearchPage;