import { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import MovieModal from "./MovieModal";

const MarathonView = () => {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState(null);
  const [totalRuntime, setTotalRuntime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const searchRes = await fetch(
        `https://api.pickaflick.live/api/tmdb/search/collection?query=${query}&language=en-US&page=1`
      );
      const searchJson = await searchRes.json();
      
      if (searchJson.results.length === 0) {
        alert("No collection found!");
        setLoading(false);
        return;
      }

      const collectionId = searchJson.results[0].id;

      const detailsRes = await fetch(
        `https://api.pickaflick.live/api/tmdb/collection/${collectionId}?language=en-US`
      );
      const detailsJson = await detailsRes.json();
      setCollection(detailsJson);

      const moviePromises = detailsJson.parts.map((movie) =>
        fetch(`https://api.pickaflick.live/api/tmdb/movie/${movie.id}?language=en-US`).then((res) => res.json())
      );
      
      const moviesDetails = await Promise.all(moviePromises);
      
      const totalMinutes = moviesDetails.reduce((acc, curr) => acc + (curr.runtime || 0), 0);
      setTotalRuntime(totalMinutes);

    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Franchise Marathon</h2>
      <p className="mb-6 text-gray-400">Search by Franchise (e.g., The Avengers, Harry Potter)</p>
      
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          className="p-3 bg-black border border-gray-700 rounded text-white w-full md:w-1/3 focus:border-red-600 focus:outline-none placeholder-gray-500"
          placeholder="Enter Franchise Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
            onClick={handleSearch} 
            className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded font-bold transition-colors"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {collection && (
        <div className="animate-fade">
          {/* Header - Black Accent */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-black p-6 rounded-xl border border-gray-800 shadow-lg">
            {collection.poster_path && (
                <img src={IMG_CDN_URL + collection.poster_path} alt="cover" className="w-32 rounded-lg border border-gray-700 shadow-md" />
            )}
            <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold">{collection.name}</h3>
                <p className="text-gray-400 mt-1">{collection.parts.length} Movies</p>
                <div className="bg-gray-900/50 inline-block px-4 py-2 mt-3 rounded-lg border border-gray-700">
                    <p className="text-yellow-400 font-bold text-xl">
                        ⏱️ Total Binge Time: {Math.floor(totalRuntime / 60)}h {totalRuntime % 60}m
                    </p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {collection.parts.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-black border border-gray-800 p-3 rounded-lg cursor-pointer hover:scale-105 transition hover:border-gray-500"
                onClick={() => setSelectedMovie(movie)}
              >
                <img src={IMG_CDN_URL + movie.poster_path} alt={movie.title} className="rounded mb-3 w-full" />
                <h4 className="font-bold text-sm leading-tight">{movie.title}</h4>
                <p className="text-xs text-gray-500 mt-1">({movie.release_date?.split("-")[0]})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default MarathonView;