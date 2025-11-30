import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { addGptMovieResult, setGptLoading } from "../utils/gptSlice";
import { Paper, InputBase, Button, CircularProgress, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const isLoading = useSelector((store) => store.gpt.loading);
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
    if (!searchText.current.value) return; 
    
    dispatch(setGptLoading(true));

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const response = await fetch("https://api.pickaflick.live/api/gpt", {
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
      // Set loading to false here if you want the spinner to stop after results load
      dispatch(setGptLoading(false));

    } catch (error) {
      console.error(error);
      dispatch(setGptLoading(false));
    }
  };

  return (
    <Box sx={{ pt: { xs: "35%", md: "10%" }, display: "flex", justifyContent: "center" }}>
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "90%", md: "50%" },
          bgcolor: "black",
          border: "1px solid #374151",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder={lang[langKey].gptSearchPlaceholder}
          inputRef={searchText}
        />
        <Button
          variant="contained"
          sx={{ 
            p: "10px 20px", 
            borderRadius: "0 4px 4px 0",
            bgcolor: "#b91c1c", // red-700
            "&:hover": { bgcolor: "#991b1b" },
            "&.Mui-disabled": {
              bgcolor: "#7f1d1d",
              color: "white" 
            }
          }}
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <>
                {/*Icon only on Mobile, Icon+Text on Desktop */}
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                   <SearchIcon />
                </Box>
                
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
                   <SearchIcon />
                   {lang[langKey].search}
                </Box>
            </>
          )}
        </Button>
      </Paper>
    </Box>
  );
};
export default GptSearchBar;