import { useNavigate, Link } from "react-router-dom";
import { BG_URL } from "../utils/constants";
import Header from "./Header";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black">
      <Header />
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover opacity-60" src={BG_URL} alt="background" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to Pickaflick
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow-md font-medium">
          Your personal AI-powered movie recommendation companion.
        </p>

        {/* ✅ FIX: Footer Links placed right here, below the description */}
        <div className="mt-8 text-white text-xs md:text-sm flex items-center justify-center gap-2">
            <Link to="/privacy-policy" className="hover:text-red-500 hover:underline transition">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms-of-service" className="hover:text-red-500 hover:underline transition">Terms of Service</Link>
        </div>
      </div>

      {/* Register Button (Bottom Left) */}
      <div className="absolute bottom-12 left-8 md:bottom-20 md:left-10 z-20">
        <button onClick={() => navigate("/register")} className="px-6 py-3 md:px-8 md:py-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-lg md:text-xl transition-transform hover:scale-105 shadow-lg">Register</button>
      </div>
      
      {/* Login Button (Bottom Right) */}
      <div className="absolute bottom-12 right-8 md:bottom-20 md:right-10 z-20">
        <button onClick={() => navigate("/login")} className="px-6 py-3 md:px-8 md:py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-lg text-lg md:text-xl transition-transform hover:scale-105 shadow-lg">Login</button>
      </div>
    </div>
  );
};
export default LandingPage;