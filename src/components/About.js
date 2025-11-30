import { Box, Typography, Modal, Avatar, Chip, Stack, IconButton, Divider } from "@mui/material";
import { GitHub, LinkedIn, Email, Close, Code, Storage, Brush } from "@mui/icons-material";
import { DEV_AVATAR } from "../utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 500 }, // 90% width on mobile
  maxHeight: "90vh", // ✅ Prevents overflow on small screens
  overflowY: "auto", // ✅ Adds scroll if content is too tall
  bgcolor: "black",
  border: "1px solid #333",
  boxShadow: 24,
  p: { xs: 3, md: 4 }, // ✅ Reduced padding on mobile (24px vs 32px)
  borderRadius: 2,
  outline: "none",
  color: "white"
};

const About = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        
        {/* Close Button */}
        <IconButton 
            onClick={onClose} 
            sx={{ position: "absolute", top: 10, right: 10, color: "gray", "&:hover": { color: "white" } }}
        >
            <Close />
        </IconButton>

        {/* Header: Avatar & Name */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Avatar 
                src={DEV_AVATAR}
                sx={{ 
                    width: { xs: 80, md: 100 }, // ✅ Smaller avatar on mobile
                    height: { xs: 80, md: 100 }, 
                    mb: 2, 
                    border: "2px solid #b91c1c" 
                }} 
            />
            <Typography 
                variant="h5" 
                fontWeight="bold" 
                align="center" // ✅ Ensures text stays centered even if it wraps
                sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }} // ✅ Responsive font size
            >
                Mohammed Ghouseuddin Qureshi
            </Typography>
            <Typography variant="subtitle2" color="gray" sx={{ mt: 0.5 }}>
                Passionate Programmer
            </Typography>
        </Box>

        <Divider sx={{ bgcolor: "#333", mb: 3 }} />

        {/* Bio */}
        <Typography 
            variant="body1" 
            sx={{ 
                color: "#ddd", 
                textAlign: "center", 
                mb: 3, 
                lineHeight: 1.6,
                fontSize: { xs: "0.9rem", md: "1rem" } // ✅ Slightly smaller text for better reading on phone
            }}
        >
            Hi! I built <b>Pickaflick</b> to demonstrate the power of AI in modern web applications. 
            Passionate about building scalable, user-friendly applications using the MERN stack and AI integration.
        </Typography>

        {/* Tech Stack Chips */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="caption" sx={{ color: "gray", textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 1, textAlign: "center" }}>
                Tech Stack
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap sx={{ gap: 1 }}>
                <Chip icon={<Code style={{ color: "white" }} />} label="React.js" sx={{ bgcolor: "#111", color: "white", border: "1px solid #333" }} />
                <Chip icon={<Brush style={{ color: "white" }} />} label="Material UI" sx={{ bgcolor: "#111", color: "white", border: "1px solid #333" }} />
                <Chip icon={<Storage style={{ color: "white" }} />} label="Firebase" sx={{ bgcolor: "#111", color: "white", border: "1px solid #333" }} />
                <Chip label="Redux Toolkit" sx={{ bgcolor: "#111", color: "white", border: "1px solid #333" }} />
                <Chip label="OpenAI GPT" sx={{ bgcolor: "#111", color: "white", border: "1px solid #333" }} />
            </Stack>
        </Box>

        {/* Social Links */}
        <Stack direction="row" spacing={3} justifyContent="center">
            <IconButton href="https://github.com/waseemqureshi04" target="_blank" sx={{ color: "white", "&:hover": { color: "#b91c1c" } }}>
                <GitHub fontSize="large" />
            </IconButton>
            <IconButton href="https://linkedin.com/in/qureshi04" target="_blank" sx={{ color: "white", "&:hover": { color: "#0a66c2" } }}>
                <LinkedIn fontSize="large" />
            </IconButton>
            <IconButton href="mailto:waseemq268@gmail.com" sx={{ color: "white", "&:hover": { color: "#ea4335" } }}>
                <Email fontSize="large" />
            </IconButton>
        </Stack>

      </Box>
    </Modal>
  );
};

export default About;