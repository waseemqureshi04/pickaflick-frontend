import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { changeLanguage } from "../utils/configSlice";
import About from "./About";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Select,
  MenuItem,
  Menu,
  Avatar,
  Typography,
  Container,
} from "@mui/material";
import { KeyboardArrowDown, Logout, Info } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const isModalOpen = useSelector((store) => store.config.isModalOpen);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  
  const isGptPage = location.pathname === "/gpt";
  const isHomePage = ["/home", "/browse"].includes(location.pathname);
  const isStudioPage = ["/studio", "/features"].includes(location.pathname);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL, emailVerified } = user;
        dispatch(addUser({ uid, email, displayName, photoURL, emailVerified }));

        if (emailVerified && ["/", "/login", "/register", "/reset-password"].includes(location.pathname)) {
          navigate("/home");
        }
      } else {
        dispatch(removeUser());
        if (!["/", "/login", "/register", "/reset-password", "/privacy-policy", "/terms-of-service"].includes(location.pathname)) {
          navigate("/");
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  const handleSignOut = () => {
    handleCloseUserMenu();
    signOut(auth).catch(() => navigate("/error"));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  // Menu Handlers
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle opening About Modal
  const handleOpenAbout = () => {
    handleCloseUserMenu();
    setShowAbout(true);
  };

  if (isModalOpen) return null;

  return (
    <AppBar 
      position="absolute" 
      sx={{ 
        background: "linear-gradient(to bottom, black, transparent)", 
        boxShadow: "none", 
        zIndex: 50 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", py: 2 }}>
          
          {/* Logo Section */}
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, mb: { xs: 2, md: 0 } }}>
            <Box
              component="img"
              src={LOGO}
              alt="logo"
              sx={{ width: { xs: 128, md: 176 }, cursor: "pointer", "&:hover": { opacity: 0.8 } }}
              onClick={() => navigate("/home")}
            />
          </Box>

          {/* User Controls Section */}
          {user && user.emailVerified && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              
              {/* Language Selector */}
              {isGptPage && (
                <Select
                  size="small"
                  defaultValue={SUPPORTED_LANGUAGES[0].identifier}
                  onChange={handleLanguageChange}
                  sx={{ 
                    bgcolor: "grey.900", 
                    color: "white", 
                    ".MuiSvgIcon-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
                    display: { xs: "none", md: "flex" }
                  }}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <MenuItem key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {/* Navigation Buttons */}
              {!isHomePage && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/home")}
                  sx={{ bgcolor: "#b91c1c", "&:hover": { bgcolor: "#991b1b" } }}
                >
                  Home
                </Button>
              )}

              {!isStudioPage && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/studio")}
                  sx={{ bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }} // indigo-600
                >
                  Studio
                </Button>
              )}

              {!isGptPage && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/gpt")}
                  sx={{ bgcolor: "#9333ea", "&:hover": { bgcolor: "#7e22ce" }, whiteSpace: "nowrap" }}
                >
                  GPT Search
                </Button>
              )}

              {/* User Avatar & Menu */}
              <Box sx={{ flexGrow: 0, ml: 1 }}>
                <Box 
                    onClick={handleOpenUserMenu} 
                    sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 0.5 }}
                >
                    <Avatar
                        alt={user.displayName}
                        src={user?.photoURL || USER_AVATAR}
                        variant="rounded"
                        sx={{ width: 40, height: 40, border: "2px solid transparent", "&:hover": { borderColor: "white" } }}
                        imgProps={{ onError: (e) => { e.target.onerror = null; e.target.src = USER_AVATAR; } }} 
                    />
                    <KeyboardArrowDown sx={{ color: "white", transform: anchorElUser ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }} />
                </Box>
                
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: { bgcolor: "black", border: "1px solid #374151", color: "white", minWidth: 160 }
                  }}
                >
                   {/* User Info Header in Menu */}
                   <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #374151", mb: 1 }}>
                      <Typography variant="caption" color="gray">Signed in as</Typography>
                      <Typography variant="body2" fontWeight="bold" noWrap>{user.displayName || "User"}</Typography>
                   </Box>

                  {/* Added About Dev Button */}
                  <MenuItem onClick={handleOpenAbout} sx={{ gap: 1 }}>
                     <Info fontSize="small" sx={{ color: "gray" }} />
                     <Typography>About Dev</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleSignOut} sx={{ color: "#ef4444", fontWeight: "bold", gap: 1 }}>
                    <Logout fontSize="small" />
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>

            </Box>
          )}

          {/* Render About Modal */}
          <About open={showAbout} onClose={() => setShowAbout(false)} />

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;