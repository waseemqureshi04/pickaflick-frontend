import { useState, useRef } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import MovieModal from "./MovieModal"; 

const VPNScout = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [modalMovie, setModalMovie] = useState(null); 
  const [providers, setProviders] = useState(null);
  const [country, setCountry] = useState("US");
  
  const scrollContainer = useRef(null);

  const countries = ["US", "IN", "GB", "CA", "AU", "JP", "FR", "DE"];

  const searchMovie = async () => {
    const data = await fetch(
      `https://api.pickaflick.live/api/tmdb/search/movie?query=${query}&page=1`
    );
    const json = await data.json();
    setMovies(json.results);
    setSelectedMovie(null);
    setProviders(null);
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

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">VPN Scout - Check Global Availability</h2>
      <p className="mb-4 text-gray-400">Search any movie and check if it’s available to stream in your country.</p>
      
      {/* Search Input */}
      <div className="flex gap-2 mb-6">
        <input
          className="p-2 text-black rounded w-full md:w-1/3"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovie} className="bg-blue-600 px-4 py-2 rounded font-bold">Search</button>
      </div>

      {/* Movie List */}
      {!selectedMovie && (
        <div className="relative group">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 z-40 bg-gradient-to-r from-black/70 to-transparent text-white w-15 h-full hidden group-hover:flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div 
            ref={scrollContainer} 
            className="flex overflow-x-scroll gap-4 pb-8 no-scrollbar p-4 scroll-smooth"
          >
            {movies.map((m) => (
              m.poster_path && (
              <div 
                key={m.id} 
                onClick={() => handleCardClick(m)} 
                className="min-w-[160px] md:min-w-[200px] cursor-pointer hover:scale-110 transition duration-300 hover:z-50 origin-center"
              >
                <img 
                  src={IMG_CDN_URL + m.poster_path} 
                  className="rounded-lg shadow-lg hover:shadow-2xl hover:ring-2 hover:ring-white" 
                  alt={m.title} 
                />
              </div>)
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-100 bg-gradient-to-l from-black/70 to-transparent text-white w-15 h-full hidden group-hover:flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* Provider Details Panel */}
      {selectedMovie && providers && (
        <div className="bg-gray-900 p-6 rounded-lg flex flex-col md:flex-row gap-8 animate-fade mt-4 border border-gray-700">
          <img src={IMG_CDN_URL + selectedMovie.poster_path} className="w-48 rounded shadow-lg" alt="poster" />
          
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-2">{selectedMovie.title}</h3>
            
            {/* MovieModal Prop */}
            <button 
                onClick={() => setModalMovie(selectedMovie)}
                className="mb-6 bg-red-700 hover:bg-red-800 text-white text-sm px-4 py-2 rounded font-bold transition flex items-center gap-2"
            >
                ▶ Watch Trailer & Info
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-300 font-semibold">Check availability in:</span>
              <select 
                className="text-black p-2 rounded font-bold cursor-pointer" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {!currentProviders ? (
              <p className="text-red-400 font-bold text-lg">❌ Not streaming in {country}.</p>
            ) : (
              <div>
                {currentProviders.flatrate && (
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-400 mb-2">Stream:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {currentProviders.flatrate.map((p) => (
                        <img key={p.provider_id} src={IMG_CDN_URL + p.logo_path} className="w-12 rounded shadow-md" title={p.provider_name} alt={p.provider_name} />
                      ))}
                    </div>
                  </div>
                )}
                
                {currentProviders.buy && (
                  <div>
                    <h4 className="font-bold text-gray-400 mb-2">Buy/Rent:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {currentProviders.buy.map((p) => (
                        <img key={p.provider_id} src={IMG_CDN_URL + p.logo_path} className="w-12 rounded shadow-md" title={p.provider_name} alt={p.provider_name} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => setSelectedMovie(null)} className="mt-6 text-sm underline text-gray-400 hover:text-white cursor-pointer">Back to results</button>
          </div>
        </div>
      )}

      {/* Render Modal */}
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