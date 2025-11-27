import { useEffect, useState } from "react";

const MovieModal = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [trailerError, setTrailerError] = useState(false);

  useEffect(() => {
    if (!movie?.id) return;

    // Fetch trailer
    fetch(
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/videos?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
        else setTrailerError(true);
      })
      .catch(() => setTrailerError(true));

    // Fetch reviews
    fetch(
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/reviews?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setReviews(data.results || []));
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-neutral-800 text-white p-6 rounded-md w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto relative">

        {/* ❌ Netflix-style Close Button */}
        <button
          className="absolute top-4 right-4 text-red-600 hover:text-red-700 text-2xl font-bold"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Title & Rating */}
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="mb-2 font-semibold">Ratings: {movie.vote_average}⭐</p>

        {/* Overview */}
        <p className="mb-4">{movie.overview}</p>

        {/* Trailer or Fallback */}
        {trailerKey ? (
          <div className="mb-6">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ) : trailerError ? (
          <div className="mb-6 text-gray-400 italic">
            Trailer not available in your region.
          </div>
        ) : null}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">User Reviews:</h3>
            <ul className="space-y-2">
              {reviews.slice(0, 3).map((review) => (
                <li
                  key={review.id}
                  className="border border-gray-600 p-3 rounded"
                >
                  <p className="text-sm font-bold">{review.author}</p>
                  <p className="text-sm italic">
                    "{review.content.slice(0, 200)}..."
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
