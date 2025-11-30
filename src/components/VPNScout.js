import { useState, useRef } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import MovieModal from "./MovieModal";
import MovieCard from "./MovieCard";
import ShimmerMovieCard from "./ShimmerMovieCard";

const VPNScout = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [modalMovie, setModalMovie] = useState(null); 
  const [providers, setProviders] = useState(null);
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false); 
  
  const scrollContainer = useRef(null);

  const countries = ["US", "IN", "GB", "CA", "AU", "JP", "FR", "DE"];

  const searchMovie = async () => {
    if (!query) return;
    setLoading(true); 
    const data = await fetch(
      `https://api.pickaflick.live/api/tmdb/search/movie?query=${query}&page=1`
    );
    const json = await data.json();
    setMovies(json.results);
    setSelectedMovie(null);
    setProviders(null);
    setLoading(false); 
  };

  const handleCardClick = async (movie) => {
    setSelectedMovie(movie);
    
    const data = await fetch(
      `https://api.pickaflick.live/api/tmdb/movie/${movie.id}/watch/providers`
    );
    const json = await data.json();
    setProviders(json.results);
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const currentProviders = providers?.[country];
  
  const shouldShowList = loading || (movies.length > 0 && !selectedMovie);

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">VPN Scout - Check Global Availability</h2>
      <p className="mb-6 text-gray-400">Search any movie and check if it’s available to stream in your country.</p>
      
      {/* Search Input - Dark Theme */}
      <div className="flex gap-2 mb-8">
        <input
          className="p-3 bg-black border border-gray-700 rounded text-white w-full md:w-1/3 focus:border-blue-600 focus:outline-none placeholder-gray-500"
          placeholder="Search a Movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
            onClick={searchMovie} 
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded font-bold min-w-[120px] transition-colors"
        >
            {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Movie List Container */}
      {shouldShowList && (
        <div className="relative group">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 z-40 bg-gradient-to-r from-black via-black/70 to-transparent text-white w-12 h-full hidden group-hover:flex items-center justify-center hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 drop-shadow-lg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div 
            ref={scrollContainer} 
            className="flex overflow-x-scroll no-scrollbar p-2 scroll-smooth gap-4"
          >
              {loading ? (
                Array(10).fill(0).map((_, i) => <ShimmerMovieCard key={i} />)
              ) : movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => handleCardClick(movie)}
                  />
                ))
              ) : (
                <p className="text-gray-400 p-4">No results found.</p>
              )}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-40 bg-gradient-to-l from-black via-black/70 to-transparent text-white w-12 h-full hidden group-hover:flex items-center justify-center hover:scale-110 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 drop-shadow-lg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* Provider Details Panel - Black Accent */}
      {selectedMovie && providers && (
        <div className="bg-black p-6 rounded-xl flex flex-col md:flex-row gap-8 animate-fade mt-6 border border-gray-800 shadow-2xl">
          <img src={IMG_CDN_URL + selectedMovie.poster_path} className="w-48 rounded-lg shadow-lg border border-gray-800" alt="poster" />
          
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">{selectedMovie.title}</h3>
            
            <button 
                onClick={() => setModalMovie(selectedMovie)}
                className="mb-6 bg-red-700 hover:bg-red-800 text-white text-sm px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 border border-red-900"
            >
                ▶ Watch Trailer & Info
            </button>
            
            <div className="flex items-center gap-3 mb-6 bg-gray-900/50 p-3 rounded-lg w-fit border border-gray-800">
              <span className="text-gray-300 font-semibold">Check availability in:</span>
              <select 
                className="bg-black text-white p-2 rounded border border-gray-700 cursor-pointer focus:border-blue-500 outline-none" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {!currentProviders ? (
              <p className="text-red-500 font-bold text-lg bg-red-900/20 p-4 rounded border border-red-900/50">❌ Not streaming in {country}.</p>
            ) : (
              <div className="space-y-6">
                {currentProviders.flatrate && (
                  <div>
                    <h4 className="font-bold text-gray-400 mb-2 uppercase text-sm tracking-wide">Stream</h4>
                    <div className="flex gap-3 flex-wrap">
                      {currentProviders.flatrate.map((p) => (
                        <img key={p.provider_id} src={IMG_CDN_URL + p.logo_path} className="w-12 rounded-lg shadow-md border border-gray-700" title={p.provider_name} alt={p.provider_name} />
                      ))}
                    </div>
                  </div>
                )}
                
                {currentProviders.buy && (
                  <div>
                    <h4 className="font-bold text-gray-400 mb-2 uppercase text-sm tracking-wide">Buy / Rent</h4>
                    <div className="flex gap-3 flex-wrap">
                      {currentProviders.buy.map((p) => (
                        <img key={p.provider_id} src={IMG_CDN_URL + p.logo_path} className="w-12 rounded-lg shadow-md border border-gray-700" title={p.provider_name} alt={p.provider_name} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => setSelectedMovie(null)} className="mt-8 text-sm text-gray-400 hover:text-white cursor-pointer hover:underline">
                &larr; Back to results
            </button>
          </div>
        </div>
      )}

      {modalMovie && (
        <MovieModal 
          movie={modalMovie} 
          onClose={() => setModalMovie(null)} 
        />
      )}
    </div>
  );
};

export default VPNScout;