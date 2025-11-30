import { useEffect, useState } from "react";
import { IconButton, Typography, Box, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux"; 
import { setModalOpen } from "../utils/configSlice"; 
import { IMG_CDN_URL } from "../utils/constants"; 

const MovieModal = ({ movie, onClose }) => {
  const dispatch = useDispatch(); 
  const [trailerKey, setTrailerKey] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [providers, setProviders] = useState(null); 
  const [trailerError, setTrailerError] = useState(false);

  // Set Default Country (IN = India, US = USA)
  const country = "IN"; 

  useEffect(() => {
    if (!movie?.id) return;

    dispatch(setModalOpen(true));

    // 1. Fetch trailer
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

    // 2. Fetch reviews
    fetch(
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/reviews?language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data.results || []));

    // 3. Fetch Providers
    fetch(
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/watch/providers`
    )
      .then((res) => res.json())
      .then((data) => setProviders(data.results || {}));

    return () => {
      dispatch(setModalOpen(false));
    };
  }, [movie, dispatch]);

  if (!movie) return null;

  const currentProviders = providers?.[country];

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[1300] backdrop-blur-md p-4">
      <Paper 
        elevation={24}
        sx={{ 
            bgcolor: "black", 
            color: "white", 
            p: { xs: 2, md: 4 },
            borderRadius: 2, 
            border: "1px solid #333", 
            width: { xs: "95%", md: "70%", lg: "60%" },
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
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
            zIndex: 10,
            color: "gray", 
            bgcolor: "rgba(255,255,255,0.1)", 
            "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.2)" } 
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* ✅ Header Section: Flexbox for Title (Left) and Stream (Right) */}
        <Box 
            sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", md: "row" }, // Stack on mobile, Row on desktop
                justifyContent: "space-between", 
                alignItems: { xs: "flex-start", md: "flex-start" },
                mb: 2,
                gap: 2,
                pr: { xs: 0, md: 6 } // Add padding right on desktop so text doesn't hit Close button
            }}
        >
            {/* Left Side: Title & Rating */}
            <Box>
                <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" }, lineHeight: 1.2 }}
                >
                    {movie.title}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ color: "#fbbf24", fontWeight: "bold", mt: 1 }}>
                    ⭐ {movie.vote_average.toFixed(1)} / 10 
                    <span style={{ color: "#aaa", fontWeight: "normal", marginLeft: "10px" }}>
                        ({movie.release_date?.split("-")[0]})
                    </span>
                </Typography>
            </Box>

            {/* Right Side: Stream Section (Moved Here) */}
            {currentProviders?.flatrate && (
                <Box sx={{ minWidth: 140, textAlign: { xs: "left", md: "right" } }}>
                    <Typography 
                        variant="caption" 
                        sx={{ color: "gray", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 1 }}
                    >
                        Stream
                    </Typography>
                    <div className={`flex gap-2 flex-wrap ${window.innerWidth >= 768 ? 'justify-end' : ''}`}>
                        {currentProviders.flatrate.map((p) => (
                        <img 
                            key={p.provider_id} 
                            src={IMG_CDN_URL + p.logo_path} 
                            className="w-10 rounded-lg shadow-md border border-gray-700" 
                            title={p.provider_name} 
                            alt={p.provider_name} 
                        />
                        ))}
                    </div>
                </Box>
            )}
        </Box>

        {/* Overview */}
        <Typography variant="body1" sx={{ mb: 4, color: "#ddd", lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}>
          {movie.overview}
        </Typography>

        {/* Trailer Section */}
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

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <Box sx={{ mt: 2, pt: 3, borderTop: "1px solid #333" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              User Reviews
            </Typography>
            <ul className="list-none p-0 m-0 space-y-4">
              {reviews.slice(0, 3).map((review) => (
                <li key={review.id} className="bg-[#111] p-4 rounded-lg border border-[#333]"> 
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