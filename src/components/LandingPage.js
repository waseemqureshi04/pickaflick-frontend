import { useNavigate } from "react-router-dom";
import { BG_URL } from "../utils/constants";
import Header from "./Header";

const LandingPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation with state
  const handleNavigate = (isSignIn) => {
    navigate("/auth", { state: { isSignIn } });
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Show Logo Header */}
      <Header />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-60"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Main Intro Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to Pickaflick
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow-md font-medium">
          Your personal AI-powered movie recommendation companion. 
          Discover your next favorite film instantly with the power of GPT.
        </p>
      </div>

      {/* Register Button (Bottom Left) */}
      <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-20">
        <button
          onClick={() => handleNavigate(false)}
          className="px-6 py-3 md:px-8 md:py-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-lg md:text-xl transition-transform hover:scale-105 shadow-lg"
        >
          Register
        </button>
      </div>

      {/* Login Button (Bottom Right) */}
      <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 z-20">
        <button
          onClick={() => handleNavigate(true)}
          className="px-6 py-3 md:px-8 md:py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-lg text-lg md:text-xl transition-transform hover:scale-105 shadow-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;