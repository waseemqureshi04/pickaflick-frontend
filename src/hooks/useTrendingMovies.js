import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, API_BASE_URL } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  const getTrendingMovies = async () => {
    try {
      const data = await fetch(
        `${API_BASE_URL}/api/tmdb/trending/movie/day?language=en-US`,
        API_OPTIONS
      );

      if (!data.ok) throw new Error("Failed to fetch");

      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("Error fetching Trending movies:", error);
    }
  };

  useEffect(() => {
    if (!trendingMovies) getTrendingMovies();
    // eslint-disable-next-line
  }, []);
};

export default useTrendingMovies;