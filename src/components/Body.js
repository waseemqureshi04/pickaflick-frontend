import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import LandingPage from "./LandingPage";
import Features from "./Features";
import GptSearch from "./GptSearch";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import Homepage from "./Homepage";
const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/homepage", element: <Homepage /> }, // ✅ Added for Google Verification
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/home", element: <Browse /> },
    { path: "/studio", element: <Features /> },
    { path: "/gpt", element: <GptSearch /> },
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