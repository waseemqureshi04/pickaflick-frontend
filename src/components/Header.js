import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { LogOut, User, ChevronDown, MonitorPlay, Sparkles, Home, Menu, X } from "lucide-react"; 

import { LOGO, USER_AVATAR, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { changeLanguage } from "../utils/configSlice";
import About from "./About";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // New Mobile State
  const [showAbout, setShowAbout] = useState(false);

  const isGptPage = location.pathname === "/gpt";
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    signOut(auth).catch(() => navigate("/error"));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  // Helper to close mobile menu on navigation
  const handleNavClick = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-3 flex items-center justify-between ${
          isScrolled || showMobileMenu ? "glass bg-black/90" : "bg-gradient-to-b from-black/90 to-transparent"
        }`}
      >
        {/* Left Side: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-8">
            {/* Mobile Menu Button */}
            {user && (
              <button 
                className="md:hidden text-white" 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
              </button>
            )}

            <img
                src={LOGO}
                alt="logo"
                className="w-24 md:w-36 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate("/home")}
            />

            {/* Desktop Navigation */}
            {user && (
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
                <button onClick={() => navigate("/home")} className="hover:text-white transition flex items-center gap-2">
                    <Home size={16} /> Home
                </button>
                <button onClick={() => navigate("/studio")} className="hover:text-white transition flex items-center gap-2">
                    <MonitorPlay size={16} /> Studio
                </button>
                <button onClick={() => navigate("/gpt")} className="hover:text-brand-light transition flex items-center gap-2 text-brand-light">
                    <Sparkles size={16} /> GPT Search
                </button>
                </div>
            )}
        </div>

        {/* Right Side: User Profile & Actions */}
        {user && (
          <div className="flex items-center gap-2 md:gap-4">
            
            {isGptPage && (
              <select
                className="bg-black/40 border border-white/30 text-white text-xs py-1 px-2 rounded hover:bg-white/10 transition outline-none cursor-pointer"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier} className="bg-gray-900">
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* User Dropdown Trigger */}
            <div 
              className="relative group"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={() => setShowDropdown(!showDropdown)} // Allow click on mobile
            >
              <div className="flex items-center gap-2 cursor-pointer py-2">
                <img
                  src={user?.photoURL || USER_AVATAR}
                  alt="user"
                  className="w-8 h-8 rounded-md object-cover border border-transparent group-hover:border-white transition"
                />
                <ChevronDown size={16} className={`hidden md:block text-white transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
              </div>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 glass-card rounded-md overflow-hidden z-[60]"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                    </div>

                    <div className="py-1">
                      <button 
                        onClick={() => setShowAbout(true)}
                        className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center gap-2 transition"
                      >
                        <User size={16} /> About Dev
                      </button>
                      <button 
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-sm text-brand-light hover:bg-white/10 flex items-center gap-2 transition"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && user && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="fixed top-[60px] left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 z-40 overflow-hidden md:hidden"
            >
                <div className="flex flex-col p-4 gap-4 text-gray-200">
                    <button onClick={() => handleNavClick("/home")} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg">
                        <Home size={20} /> <span className="font-semibold">Home</span>
                    </button>
                    <button onClick={() => handleNavClick("/studio")} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg">
                        <MonitorPlay size={20} /> <span className="font-semibold">Studio</span>
                    </button>
                    <button onClick={() => handleNavClick("/gpt")} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg text-brand-light">
                        <Sparkles size={20} /> <span className="font-semibold">GPT Search</span>
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <About open={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

export default Header;