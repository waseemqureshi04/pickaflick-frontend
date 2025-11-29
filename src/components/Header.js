import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { changeLanguage } from "../utils/configSlice";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const isModalOpen = useSelector((store) => store.config.isModalOpen);
  const [isOpen, setIsOpen] = useState(false);
  const isGptPage = location.pathname === "/gpt";
  const isHomePage = location.pathname === "/home" || location.pathname === "/browse";
  const isStudioPage = location.pathname === "/studio" || location.pathname === "/features";

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => { navigate("/error"); });
  };

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

  const handleLanguageChange = (e) => { dispatch(changeLanguage(e.target.value)); };

  if (isModalOpen) return null;

  return (
    <div 
      className="absolute w-full px-4 py-4 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 transition-all duration-300"
    >
      <div className="flex flex-col items-center md:items-start">
        <img 
            className="w-32 mx-auto md:mx-0 md:w-44 cursor-pointer hover:opacity-80 transition drop-shadow-lg" 
            src={LOGO} alt="logo" onClick={() => navigate("/home")}
        />
      </div>

      {user && user.emailVerified && (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          
          {isGptPage && (
            <select className="hidden md:block p-2 bg-gray-900 text-white text-sm rounded-lg border border-gray-600 focus:outline-none" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>
          )}
          
          {/* ✅ Hide Home Button if already on Home */}
          {!isHomePage && (
            <button 
              className="py-1 px-3 bg-red-700 md:py-2 md:px-4  border border-gray-700 text-white rounded-lg text-xs md:text-smtransition" 
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          )}

          {/* ✅ Hide Studio Button if already on Studio */}
          {!isStudioPage && (
            <button 
              className="py-1 px-3 bg-indigo-600 md:py-2 md:px-4 border-gray-700 text-white rounded-lg text-xs md:text-sm transition" 
              onClick={() => navigate("/studio")}
            >
              Studio
            </button>
          )}
          
          {/* ✅ Hide GPT Button if already on GPT */}
          {!isGptPage && (
            <button 
              className="py-1 px-3 md:py-2 bg-purple-600 md:px-4 border border-gray-700 text-white rounded-lg text-xs md:text-sm transition whitespace-nowrap" 
              onClick={() => navigate("/gpt")}
            >
              GPT Search
            </button>
          )}
          
          <div className="relative ml-2">
            <div className="flex items-center gap-1 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
                <img className="w-8 h-8 md:w-10 md:h-10 rounded-md border-2 border-transparent group-hover:border-white transition object-cover shadow-md" alt="usericon" src={user?.photoURL} />
                <KeyboardArrowDown className={`text-white transition-transform duration-200 drop-shadow-md ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 md:w-48 bg-black border border-gray-700 rounded-lg shadow-xl overflow-hidden animate-fade z-50">
                    <div className="px-4 py-3 border-b border-gray-700"><p className="text-xs text-gray-400">Signed in as</p><p className="text-sm font-bold text-white truncate">{user.displayName || "User"}</p></div>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-900 transition font-bold flex items-center gap-2">
                        <Logout fontSize="small" /> Log Out
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;