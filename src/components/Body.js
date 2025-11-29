import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import LandingPage from "./LandingPage";
import Features from "./Features";
import GptSearch from "./GptSearch"; // ✅ Import this
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/reset-password", element: <ResetPassword /> },
    
    // ✅ NEW: Cleaner URLs
    { path: "/home", element: <Browse /> },  // Was /browse
    { path: "/studio", element: <Features /> }, // Was /features
    { path: "/gpt", element: <GptSearch /> },   // New dedicated route
    
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-of-service", element: <TermsOfService /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;