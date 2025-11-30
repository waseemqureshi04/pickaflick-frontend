import { useEffect, useState } from "react";
import { IconButton, Typography, Box, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux"; // ✅ Import useDispatch
import { setModalOpen } from "../utils/configSlice"; // ✅ Import action

const MovieModal = ({ movie, onClose }) => {
  const dispatch = useDispatch(); // ✅ Init dispatch
  const [trailerKey, setTrailerKey] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [trailerError, setTrailerError] = useState(false);

  useEffect(() => {
    if (!movie?.id) return;

    // ✅ Hide Header when Modal opens
    dispatch(setModalOpen(true));

    // Fetch trailer
    fetch(
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/videos?language=en-US`
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
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/reviews?language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data.results || []));

    // ✅ Cleanup: Show Header again when Modal closes/unmounts
    return () => {
      dispatch(setModalOpen(false));
    };
  }, [movie, dispatch]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[1300] backdrop-blur-md p-4">
      <Paper 
        elevation={24}
        sx={{ 
            bgcolor: "black", // ✅ Changed to True Black
            color: "white", 
            p: { xs: 2, md: 4 },
            borderRadius: 2, 
            border: "1px solid #333", // ✅ Added subtle border
            width: { xs: "95%", md: "70%", lg: "60%" },
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            marginTop: { xs: "0px", md: 0 }, 
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
        }}
      >

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ 
            position: "absolute", 
            top: 10, 
            right: 10, 
            color: "gray", 
            bgcolor: "rgba(255,255,255,0.1)", // slightly lighter on black
            "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.2)" } 
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ pr: 4, fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        >
          {movie.title}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ color: "#fbbf24", fontWeight: "bold", mb: 2 }}>
          ⭐ {movie.vote_average.toFixed(1)} / 10 
          <span style={{ color: "#aaa", fontWeight: "normal", marginLeft: "10px" }}>
            ({movie.release_date?.split("-")[0]})
          </span>
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: "#ddd", lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}>
          {movie.overview}
        </Typography>

        {trailerKey ? (
          <Box sx={{ position: "relative", paddingBottom: "56.25%", height: 0, width: "100%", mb: 4, borderRadius: "8px", overflow: "hidden", border: "1px solid #333" }}>
            <iframe
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "8px" }}
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </Box>
        ) : trailerError ? (
          <Box sx={{ height: 150, bgcolor: "#111", display: "flex", alignItems: "center", justifyContent: "center", mb: 4, borderRadius: 2, border: "1px solid #333" }}>
              <Typography variant="body2" color="gray">Trailer not available.</Typography>
          </Box>
        ) : null}

        {reviews.length > 0 && (
          <Box sx={{ mt: 2, pt: 3, borderTop: "1px solid #333" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Reviews
            </Typography>
            <ul className="list-none p-0 m-0 space-y-4">
              {reviews.slice(0, 3).map((review) => (
                <li key={review.id} className="bg-[#111] p-4 rounded-lg border border-[#333]"> {/* ✅ Darker review cards */}
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#e50914" }}>
                    {review.author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#bbb", mt: 1, fontStyle: "italic", fontSize: "0.85rem" }}>
                    "{review.content.slice(0, 150)}..."
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default MovieModal;