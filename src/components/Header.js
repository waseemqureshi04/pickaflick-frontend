import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // If user is on Login/Landing page, move them to Browse
        if (location.pathname === "/" || location.pathname === "/auth") {
           navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        
        if (location.pathname !== "/" && location.pathname !== "/auth") {
           navigate("/");
        }
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]); // Added location.pathname to dependencies

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-4 py-4 bg-black z-50 flex flex-col md:flex-row justify-between">
      <img className="w-24 mx-auto md:mx-0 md:w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 justify-center md:justify-between items-center gap-1 md:gap-4">
          {showGptSearch && (
            <select
              className="p-1 md:p-2 bg-gray-900 text-white text-xs md:text-base rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-1 px-2 md:py-2 md:px-4 bg-purple-800 text-white rounded-lg text-xs md:text-base whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="w-8 h-8 md:w-12 md:h-12 rounded-full"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white text-xs md:text-base whitespace-nowrap"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;