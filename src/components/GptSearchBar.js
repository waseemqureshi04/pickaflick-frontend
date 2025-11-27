import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { addGptMovieResult, setGptLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.pickaflick.live/api/tmdb/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1"
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    dispatch(setGptLoading(true));

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const response = await fetch("https://api.pickaflick.live/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: gptQuery }],
        }),
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

    } catch (error) {
      console.error(error);
      dispatch(setGptLoading(false));
    }
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-2 m-2 md:p-4 md:m-4 col-span-9 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-2 md:m-4 py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg text-sm md:text-xl"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;