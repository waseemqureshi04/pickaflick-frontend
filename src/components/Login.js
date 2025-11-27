import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation

const Login = () => {
  const location = useLocation(); // ✅ Get data passed from Landing Page
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // ✅ Check if we were sent here with specific instructions (Sign In vs Sign Up)
  // If no state exists (user typed /auth directly), default to true (Sign In)
  const [isSignInForm, setIsSignInForm] = useState(
    location.state?.isSignIn !== undefined ? location.state.isSignIn : true
  );

  const [errorMessage, setErrorMessage] = useState(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage("Something went wrong. Please try again.");
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Email is already registered.");
          } else {
            setErrorMessage("Sign up failed. Please try again.");
          }
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          // Success handled by Header.js
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential") {
            setErrorMessage("Please Enter Correct Email Address or Password.");
          } else if (error.code === "auth/network-request-failed") {
            setErrorMessage("Network error. Please check your connection.");
          } else {
            setErrorMessage("Login failed. Please try again.");
          }
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="min-h-screen w-full bg-cover bg-center flex justify-center items-center"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer font-bold" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Pickaflick ? Sign Up Now !"
            : "Already Registered ? Sign In Now !"}
        </p>
      </form>
    </div>
  );
};

export default Login;