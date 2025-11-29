import { useState, useRef } from "react";
import Header from "./Header";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const email = useRef(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setMessage(null);
    setError(null);
    setIsLoading(true);
    sendPasswordResetEmail(auth, email.current.value)
      .then(() => {
        setMessage("Password reset email sent! Check your inbox.");
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error: " + error.message);
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
        <h1 className="font-bold text-3xl py-4 mb-2">Reset Password</h1>
        <p className="text-gray-300 mb-4">Enter your email and we'll send you a link to reset your password.</p>
        <input ref={email} type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-600 focus:outline-none transition" />
        {message && <p className="text-green-500 font-bold text-sm py-2">{message}</p>}
        {error && <p className="text-red-500 font-bold text-sm py-2">{error}</p>}
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg font-bold text-lg hover:bg-red-800 transition transform hover:scale-[1.02] disabled:opacity-50" onClick={handleReset} disabled={isLoading}>{isLoading ? "Sending..." : "Send Reset Link"}</button>
        <Link to="/login" className="block text-center text-gray-400 hover:text-white hover:underline mt-4">Back to Sign In</Link>
      </form>
    </div>
  );
};
export default ResetPassword;