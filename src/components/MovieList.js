import { useState, useRef } from "react";
import MovieCard from "./MovieCard";
import ShimmerMovieCard from "./ShimmerMovieCard";
import MovieModal from "./MovieModal";

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const scrollContainer = useRef(null);
  
  const isLoading = movies === null;

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -700, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 700, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 mb-12">
      {title && <h1 className="text-lg md:text-3xl py-4 text-white font-bold">{title}</h1>}
      <div className="relative group">
      
        {/* Left Button - Height matches cards, Gradient background */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-0 bottom-0 z-40 bg-gradient-to-r from-black to-transparent text-white w-12 h-full hidden group-hover:flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 drop-shadow-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainer} 
          className="flex overflow-x-scroll no-scrollbar p-2 scroll-smooth"
        >
          <div className="flex gap-4">
            {isLoading ? (
              Array(10).fill(0).map((_, i) => <ShimmerMovieCard key={i} />)
            ) : movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))
            ) : (
              <p className="text-gray-400 p-4">No results found.</p>
            )}
          </div>
        </div>

        {/* Right Button */}
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 z-40 bg-gradient-to-l from-black to-transparent text-white w-12 h-full hidden group-hover:flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 drop-shadow-lg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieList;