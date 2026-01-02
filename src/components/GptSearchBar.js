import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Sparkles, Loader2 } from "lucide-react"; 
import lang from "../utils/languageConstants";
import { addGptMovieResult, setGptLoading } from "../utils/gptSlice";
import { API_BASE_URL } from "../utils/constants";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const isLoading = useSelector((store) => store.gpt.loading);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `${API_BASE_URL}/api/tmdb/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return; 
    
    dispatch(setGptLoading(true));

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      // FIXED: Uses API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/api/gpt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: gptQuery }] }),
      });

      const gptResults = await response.json();

      if (!gptResults.choices) {
        console.error("GPT API Failed");
        dispatch(setGptLoading(false));
        return;
      }

      const gptMoviesRaw = gptResults.choices?.[0]?.message?.content.split(",");
      const gptMovies = gptMoviesRaw.map((movie) => 
         movie.replace(/^[\d+.)\-\s]+/, '').trim()
      );

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
      dispatch(setGptLoading(false));

    } catch (error) {
      console.error(error);
      dispatch(setGptLoading(false));
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center mb-8 md:mb-12 w-full">
      <form 
        className="w-[95%] md:w-1/2 glass rounded-full flex items-center p-2 border border-white/20 shadow-2xl shadow-red-900/20"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="hidden sm:block pl-4 text-brand-light animate-pulse">
           <Sparkles size={24} />
        </div>
        
        <input
          ref={searchText}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 text-base md:text-lg placeholder-gray-400 font-medium w-full min-w-0"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        
        <button
          className="bg-brand-DEFAULT hover:bg-brand-dark text-white rounded-full px-6 py-3 font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Search size={20} />
              <span className="hidden md:inline">{lang[langKey].search}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;