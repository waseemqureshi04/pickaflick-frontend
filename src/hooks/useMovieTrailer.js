import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    const getMovieVideos = async () => {
      const data = await fetch(
        `https://api.pickaflick.live/api/tmdb/movie/${movieId}/videos?language=en-US`
      );
      const json = await data.json();
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    };

    if (!trailerVideo) getMovieVideos();
  }, [dispatch, movieId, trailerVideo]);
};

export default useMovieTrailer;