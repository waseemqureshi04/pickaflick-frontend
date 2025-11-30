import { Box, Skeleton } from "@mui/material";
import ShimmerMovieCard from "./ShimmerMovieCard";

const Shimmer = () => {
  return (
    <Box 
        sx={{ 
            bgcolor: "black", 
            minHeight: "100vh", 
            width: "100%", 
            pt: { xs: "30%", md: 10 }, 
            px: 4 
        }}
    >
      {/* 1. Simulate Hero Title */}
      <Skeleton 
        variant="text" 
        sx={{ 
            bgcolor: "#374151", // gray-700
            fontSize: "3rem", 
            width: { xs: "60%", md: "30%" }, 
            mb: 1 
        }} 
      />
      
      {/* 2. Simulate Hero Description */}
      <Skeleton 
        variant="text" 
        sx={{ 
            bgcolor: "#374151", // gray-700
            fontSize: "1.5rem", 
            width: { xs: "90%", md: "50%" }, 
            mb: 6 
        }} 
      />

      {/* 3. Simulate Horizontal Scroll of Cards */}
      <Box 
        sx={{ 
            display: "flex", 
            overflowX: "scroll", 
            gap: 2,
            // Hide Scrollbar styles
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",  // IE and Edge
            scrollbarWidth: "none",   // Firefox
        }}
      >
        {Array(10).fill("").map((_, index) => (
            <ShimmerMovieCard key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default Shimmer;