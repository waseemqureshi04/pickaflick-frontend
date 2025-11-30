import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { Box, Typography, Container, Button, Stack, Link as MuiLink } from "@mui/material";
import { BG_URL, LOGO } from "../utils/constants";
import { Link } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black", color: "white", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Image */}
      <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <Box 
            component="img" 
            src={BG_URL} 
            alt="background" 
            sx={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} 
        />
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.7)" }} />
      </Box>

      {/* Content Container */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10, py: 8, textAlign: "center" }}>
        
        {/* Logo */}
        <Box component="img" src={LOGO} alt="Pickaflick Logo" sx={{ width: 200, mb: 4 }} />

        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ textShadow: "2px 2px 4px black" }}>
          Welcome to Pickaflick
        </Typography>
        
        <Typography variant="h5" sx={{ mb: 4, color: "gray", maxWidth: "600px", mx: "auto" }}>
          Your personal AI-powered movie recommendation companion.
        </Typography>

        {/* App Description (Crucial for Verification) */}
        <Box sx={{ bgcolor: "rgba(255,255,255,0.05)", p: 4, borderRadius: 2, border: "1px solid #333", mb: 6, textAlign: "left" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="red">
                About the App
            </Typography>
            <Typography paragraph color="#ccc">
                Pickaflick uses advanced Artificial Intelligence (OpenAI GPT) to help users discover movies based on their mood, preferences, and natural language queries. We integrate with TMDB to provide accurate movie details, trailers, and streaming availability.
            </Typography>
            
            <Typography variant="h6" fontWeight="bold" gutterBottom color="red" sx={{ mt: 3 }}>
                Google Data Usage
            </Typography>
            <Typography paragraph color="#ccc">
                Our app uses Google Sign-In solely for authentication purposes. We access your email address and profile picture to create your user account. We do not share your data with third parties or use it for advertising.
            </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center" sx={{ mb: 8 }}>
            <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate("/login")}
                sx={{ bgcolor: "#e50914", fontWeight: "bold", px: 4, py: 1.5, "&:hover": { bgcolor: "#b20710" } }}
            >
                Login to App
            </Button>
            <Button 
                variant="outlined" 
                size="large" 
                onClick={() => navigate("/register")}
                sx={{ color: "white", borderColor: "white", fontWeight: "bold", px: 4, py: 1.5, "&:hover": { borderColor: "gray", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
                Register
            </Button>
        </Stack>

        {/* Legal Footer (REQUIRED for Verification) */}
        <Box sx={{ borderTop: "1px solid #333", pt: 4 }}>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="gray" sx={{ "&:hover": { color: "white" } }}>Privacy Policy</Typography>
                </Link>
                <Typography color="gray">|</Typography>
                <Link to="/terms-of-service" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="gray" sx={{ "&:hover": { color: "white" } }}>Terms of Service</Typography>
                </Link>
            </Stack>
            <Typography variant="caption" display="block" color="gray" sx={{ mt: 2 }}>
                &copy; {new Date().getFullYear()} Pickaflick. All rights reserved.
            </Typography>
            <Typography variant="caption" display="block" color="gray">
                Contact: waseemq268@gmail.com
            </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Homepage;