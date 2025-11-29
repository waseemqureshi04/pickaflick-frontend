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
      <h2 className="text-2xl font-bold mb-4">Franchise Marathon - Display Collection</h2>
      <p className="mb-4 text-gray-400">Search by Franchise (e.g., Avengers, Harry Potter)
</p>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="p-2 text-black rounded w-full md:w-1/3"
          placeholder="Enter Franchise"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-red-700 px-4 py-2 rounded">
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {collection && (
        <div>
          <div className="flex items-center gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
            {collection.poster_path && (
                <img src={IMG_CDN_URL + collection.poster_path} alt="cover" className="w-24 rounded" />
            )}
            <div>
                <h3 className="text-2xl font-bold">{collection.name}</h3>
                <p className="text-gray-300">{collection.parts.length} Movies</p>
                <p className="text-yellow-400 font-bold text-xl mt-2">
                    ⏱️ Total Binge Time: {Math.floor(totalRuntime / 60)}h {totalRuntime % 60}m
                </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {collection.parts.map((movie) => (
              <div 
                key={movie.id} 
                className="bg-gray-900 p-2 rounded cursor-pointer hover:scale-105 transition"
                onClick={() => setSelectedMovie(movie)} // Open Modal
              >
                <img src={IMG_CDN_URL + movie.poster_path} alt={movie.title} className="rounded mb-2" />
                <h4 className="font-bold text-sm">{movie.title}</h4>
                <p className="text-xs text-gray-400">({movie.release_date?.split("-")[0]})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Modal */}
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