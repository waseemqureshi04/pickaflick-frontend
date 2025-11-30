import Header from "./Header";
import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

// ✅ MUI Imports
import { Box, Container } from "@mui/material";

const GPTSearch = () => {
  return (
    <Box sx={{ minHeight: "100vh", position: "relative", bgcolor: "black" }}>
      <Header />
      
      {/* Background Image Wrapper */}
      <Box 
        sx={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100vh", 
            zIndex: 0 
        }}
      >
        <Box 
            component="img" 
            src={BG_URL} 
            alt="background" 
            sx={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
        {/* Dark Overlay so text is readable */}
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", bgcolor: "rgba(0,0,0,0.6)" }} />
      </Box>

      {/* Content Wrapper */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 10 }}>
        <GptSearchBar />
        <GptMovieSuggestions />
      </Container>
    </Box>
  );
};
export default GPTSearch;