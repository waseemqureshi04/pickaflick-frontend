import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, API_BASE_URL } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        `${API_BASE_URL}/api/tmdb/movie/popular?page=1`,
        API_OPTIONS
      );

      if (!data.ok) throw new Error("Failed to fetch");

      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Error fetching Popular movies:", error);
    }
  };

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
    // eslint-disable-next-line
  }, []);
};

export default usePopularMovies;