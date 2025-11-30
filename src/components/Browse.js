import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies"; 
import useUpcomingMovies from "../hooks/useUpcomingMovies"; 
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { BG_URL } from "../utils/constants";

const Browse = () => {
  // Fetch Data Hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  return (
    <div className="w-full min-h-screen bg-black relative">
      <Header />
      
      {/* Background with overlay */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img 
            className="h-full w-full object-cover opacity-40" 
            src={BG_URL} 
            alt="background" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};
export default Browse;