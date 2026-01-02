import Header from "./Header";
import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      {/* Background Layer - Fixed */}
      <div className="fixed -z-10 w-full h-full top-0 left-0">
        <img 
            className="h-full w-full object-cover opacity-60" 
            src={BG_URL} 
            alt="background" 
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content Layer */}
      <div className="min-h-screen relative z-10 w-full overflow-x-hidden">
        <Header />
        <div className="w-full max-w-7xl mx-auto px-4">
          <GptSearchBar />
          <GptMovieSuggestions />
        </div>
      </div>
    </>
  );
};
export default GPTSearch;