import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { IconButton, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(() => setErrorMessage("Google Sign-In Failed."));
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
         if (!userCredential.user.emailVerified) {
             signOut(auth);
             setErrorMessage("Please verify your email before logging in.");
             setIsLoading(false);
             return;
         }
      })
      .catch(() => {
        setErrorMessage("Invalid Email or Password.");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover" src={BG_URL} alt="background" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-4/12 absolute p-12 bg-black/80 backdrop-blur-sm my-36 mx-auto right-0 left-0 text-white rounded-xl shadow-2xl border border-gray-700">
        <h1 className="font-bold text-3xl py-4 mb-2">Log In</h1>
        
        <input 
            ref={email} 
            type="text" 
            placeholder="Email Address" 
            className="p-4 my-2 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition" 
        />
        
        {/* Password Field with MUI Eye Icon */}
        <div className="relative my-2 w-full">
          <input 
            ref={password} 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="p-4 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition pr-12" 
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              style={{ color: "gray" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>

        <p className="text-red-500 font-bold text-sm py-2">{errorMessage}</p>
        
        <button 
            className="p-4 my-4 bg-red-700 w-full rounded-lg font-bold text-lg hover:bg-red-800 transition transform hover:scale-[1.02] disabled:opacity-50 flex justify-center items-center" 
            onClick={handleButtonClick} 
            disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </button>

        <button 
            className="p-3 mb-4 w-full rounded-lg font-bold bg-white text-black hover:bg-gray-200 transition flex items-center justify-center gap-2" 
            onClick={handleGoogleSignIn}
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6"/> Sign in with Google
        </button>

        <div className="flex justify-between items-center text-gray-400 text-sm py-2">
            <Link to="/reset-password" class="hover:text-white hover:underline cursor-pointer">Forgot Password?</Link>
            <p>New here? <Link to="/register" className="text-white font-bold hover:underline">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
};
export default Login;