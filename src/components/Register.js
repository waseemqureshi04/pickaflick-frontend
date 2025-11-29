import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendEmailVerification,
  signOut 
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { Link } from "react-router-dom";

// ✅ MUI Imports
import { IconButton, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const dispatch = useDispatch();
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ State for password toggle

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(() => setErrorMessage("Google Sign-In Failed."));
  };

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current.value;

    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);
    setSuccessMessage(null);

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: nameValue, photoURL: USER_AVATAR })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            
            sendEmailVerification(user).then(() => {
                signOut(auth).then(() => {
                    setSuccessMessage(`Account created! Verification link sent to ${emailValue}. Please verify before logging in.`);
                    setIsLoading(false);
                });
            });
          });
      })
      .catch((error) => {
        setErrorMessage(error.code === "auth/email-already-in-use" ? "Email is already registered." : error.message);
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

      <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-4/12 absolute p-12 bg-black/80 backdrop-blur-sm my-24 mx-auto right-0 left-0 text-white rounded-xl shadow-2xl border border-gray-700">
        <h1 className="font-bold text-3xl py-4 mb-2">Sign Up</h1>

        <input ref={name} type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition" />
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition" />
        
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

        {successMessage && <div className="p-3 my-2 bg-green-800/50 border border-green-500 rounded text-sm text-green-200">{successMessage}</div>}
        <p className="text-red-500 font-bold text-sm py-2">{errorMessage}</p>
        
        <button 
            className={`p-4 my-4 w-full rounded-lg font-bold text-lg transition transform flex justify-center items-center ${successMessage ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800 hover:scale-[1.02]'}`}
            onClick={handleButtonClick} 
            disabled={isLoading || successMessage}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </button>

        <button className="p-3 mb-4 w-full rounded-lg font-bold bg-white text-black hover:bg-gray-200 transition flex items-center justify-center gap-2" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6"/> Sign up with Google
        </button>

        <p className="py-4 text-gray-400">Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Sign In Now.</Link></p>
      </form>
    </div>
  );
};
export default Register;