import Header from "./Header"; // ✅ Import Header
import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <div className="min-h-screen w-full bg-black relative">
      <Header /> {/* ✅ Add Header here */}

      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <img className="h-full w-full object-cover" src={BG_URL} alt="background" />
      </div>
      
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};
export default GPTSearch;