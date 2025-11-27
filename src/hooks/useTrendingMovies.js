import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  const getTrendingMovies = async () => {
    try {
      const data = await fetch("https://api.pickaflick.live/api/tmdb/trending/movie/day?language=en-US");
      if (!data.ok) throw new Error("Failed to fetch trending movies");
      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    if (!trendingMovies) getTrendingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTrendingMovies;