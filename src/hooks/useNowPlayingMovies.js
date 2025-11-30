import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, API_BASE_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        `${API_BASE_URL}/api/tmdb/movie/now_playing?page=1`,
        API_OPTIONS
      );
      
      if (!data.ok) throw new Error("Failed to fetch");
      
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.error("Error fetching Now Playing movies:", error);
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
    // eslint-disable-next-line
  }, []);
};

export default useNowPlayingMovies;