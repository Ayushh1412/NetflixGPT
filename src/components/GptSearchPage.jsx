import { BG_IMAGE, OMDB_API_KEY, OMDB_API_URL } from "../utils/constants";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import GptMovieSuggestions from "./GptMovieSuggestions";
import openai from "../utils/openai";
import { lang } from "../utils/languageConstants";

const GptSearchPage = () => {
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);

    const searchMovieOMDB = async (movie) => {
        const data = await fetch(
             `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${movie}&type=movie`
        );
        const json = await data.json();
        return json.Search || [];
    };

    const handleGptSearchClick = async () => {
        const query = searchText.current.value;
        if(!query) return;

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +
            query +
            ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        try {
            const gptResults = await openai.chat.completions.create({
                messages: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo',
            });

            if (!gptResults.choices) {
                // Handle Error
                return;
            }

            const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

            // For each movie, search OMDB
            const promiseArray = gptMovies.map((movie) => searchMovieOMDB(movie.trim()));
            const omdbResults = await Promise.all(promiseArray);

            dispatch(addGptMovieResult({
                movieNames: gptMovies,
                movieResults: omdbResults 
            }));
            
        } catch (error) {
            console.error("GPT Search Error:", error);
            // Fallback to direct search if GPT fails or key is invalid
            const searchResults = await searchMovieOMDB(query);
            dispatch(addGptMovieResult({
                movieNames: [`Results for: ${query}`],
                movieResults: [searchResults] 
            }));
        }
    };

  return (
    <>
      <div className="fixed -z-30 w-full h-full">
        <img
          src={BG_IMAGE}
          alt="background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="pt-[45%] md:pt-[10%] flex justify-center px-4">
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg bg-opacity-80"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-3 m-4 col-span-9 rounded-lg text-sm md:text-base"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="col-span-3 m-4 py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 text-sm md:text-base"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      <div className="mt-4">
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearchPage;