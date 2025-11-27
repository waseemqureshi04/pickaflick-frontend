import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieReviews = (movieId) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`https://api.pickaflick.live/api/tmdb/movie/${movieId}/reviews`, API_OPTIONS);
        const json = await res.json();
        setReviews(json.results || []);
      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };

    fetchReviews();
  }, [movieId]);

  return reviews;
};

export default useMovieReviews;
