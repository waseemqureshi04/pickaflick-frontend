import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, API_BASE_URL } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        `${API_BASE_URL}/api/tmdb/movie/upcoming?language=en-US&page=2`,
        API_OPTIONS
      );

      if (!data.ok) throw new Error("Failed to fetch");

      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Error fetching Upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
    // eslint-disable-next-line
  }, []);
};

export default useUpcomingMovies;