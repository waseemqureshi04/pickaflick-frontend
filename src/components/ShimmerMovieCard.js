import { Skeleton, Box } from "@mui/material";

const ShimmerMovieCard = () => {
  return (
    <Box sx={{ minWidth: { xs: 150, md: 200 }, mr: 2 }}>
       <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{ 
            bgcolor: "#1f2937",
            borderRadius: 2, 
            height: 280, 
            width: "100%" 
          }} 
       />
    </Box>
  );
};
export default ShimmerMovieCard;