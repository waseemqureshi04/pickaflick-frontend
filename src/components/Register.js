import { useState } from "react"; // Removed useRef, using useState
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut,
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

  // ✅ Changed refs to state to control UI updates and button locking
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(() =>
      setErrorMessage("Google Sign-In Failed.")
    );
  };

  // ✅ Function to handle input changes and clear errors/unlock button
  const handleInputChange = (setter, value) => {
    setter(value);
    if (errorMessage) setErrorMessage(null); // Clear error when user types
    if (successMessage) setSuccessMessage(null); // Unlock button if they edit after success
  };

  const handleButtonClick = () => {
    const message = checkValidData(email, password);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);
    setSuccessMessage(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: fullName, photoURL: USER_AVATAR })
          .then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));

            sendEmailVerification(user).then(() => {
              signOut(auth).then(() => {
                setSuccessMessage(
                  `Account created! Verification link sent to ${email}. Please verify before logging in.`
                );
                setIsLoading(false);
              });
            });
          });
      })
      .catch((error) => {
        setErrorMessage(
          error.code === "auth/email-already-in-use"
            ? "Email is already registered."
            : error.message
        );
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-4/12 absolute p-12 bg-black/80 backdrop-blur-sm my-24 mx-auto right-0 left-0 text-white rounded-xl shadow-2xl border border-gray-700"
      >
        <h1 className="font-bold text-3xl py-4 mb-2">Sign Up</h1>

        <input
          value={fullName}
          onChange={(e) => handleInputChange(setFullName, e.target.value)}
          type="text"
          placeholder="Full Name"
          className="p-4 my-2 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition"
        />
        <input
          value={email}
          onChange={(e) => handleInputChange(setEmail, e.target.value)}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition"
        />

        {/* Password Field with MUI Eye Icon */}
        <div className="relative my-2 w-full">
          <input
            value={password}
            onChange={(e) => handleInputChange(setPassword, e.target.value)}
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

        {/* ✅ NEW: Password Requirements Info */}
        <div className="text-gray-400 text-xs mb-4 ml-1">
          <p>Password must contain:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
              At least one uppercase letter (A-Z)
            </li>
            <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
              At least one lowercase letter (a-z)
            </li>
            <li className={/\d/.test(password) ? "text-green-500" : ""}>
              At least one number (0-9)
            </li>
            <li className={password.length >= 8 ? "text-green-500" : ""}>
              Minimum 8 characters
            </li>
          </ul>
        </div>

        {successMessage && (
          <div className="p-3 my-2 bg-green-800/50 border border-green-500 rounded text-sm text-green-200">
            {successMessage}
          </div>
        )}
        <p className="text-red-500 font-bold text-sm py-2">{errorMessage}</p>

        <button
          className={`p-4 my-4 w-full rounded-lg font-bold text-lg transition transform flex justify-center items-center ${
            successMessage
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-800 hover:scale-[1.02]"
          }`}
          onClick={handleButtonClick}
          disabled={isLoading || !!successMessage}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </button>

        <button
          className="p-3 mb-4 w-full rounded-lg font-bold bg-white text-black hover:bg-gray-200 transition flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            className="w-6 h-6"
          />{" "}
          Sign up with Google
        </button>

        <p className="py-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-bold hover:underline">
            Sign In Now.
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;