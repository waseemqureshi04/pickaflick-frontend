import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      // ✅ Using your custom backend URL
      const response = await fetch("https://api.pickaflick.live/api/tmdb/movie/upcoming?language=en-US&page=1");
      if (!response.ok) throw new Error("Failed to fetch upcoming movies");
      const data = await response.json();
      dispatch(addUpcomingMovies(data.results));
    } catch (err) {
      console.error("Error fetching upcoming movies:", err);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpcomingMovies;