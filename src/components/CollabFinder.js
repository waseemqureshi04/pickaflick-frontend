import { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import MovieModal from "./MovieModal";

const CollabFinder = () => {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  
  // State for Modal
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchId = async (name) => {
    const res = await fetch(`https://api.pickaflick.live/api/tmdb/search/person?query=${name}&page=1`);
    const json = await res.json();
    return json.results.length > 0 ? json.results[0] : null;
  };

  const handleFind = async () => {
    setLoading(true);
    setResults([]);
    setStatus("");

    // 1. Find ID for Person A
    const p1Data = await fetchId(person1);
    if (!p1Data) {
      setStatus(`Could not find "${person1}"`);
      setLoading(false);
      return;
    }

    // 2. Find ID for Person B
    const p2Data = await fetchId(person2);
    if (!p2Data) {
      setStatus(`Could not find "${person2}"`);
      setLoading(false);
      return;
    }

    // 3. Discover movies with BOTH IDs
    const res = await fetch(
      `https://api.pickaflick.live/api/tmdb/discover/movie?with_people=${p1Data.id},${p2Data.id}&sort_by=popularity.desc`
    );
    const json = await res.json();

    if (json.results.length === 0) {
      setStatus(`No collaborations found between ${p1Data.name} and ${p2Data.name}.`);
    } else {
      setResults(json.results);
      setStatus(`Found ${json.results.length} collaborations between ${p1Data.name} and ${p2Data.name}!`);
    }
    setLoading(false);
  };

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">The Dynamic Duo</h2>
      <p className="mb-4 text-gray-400">Enter two names ( e.g., Cillian Murphy & Christopher Nolan )</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          className="p-3 rounded text-black flex-1" 
          placeholder="(Actor/Director)" 
          value={person1} 
          onChange={(e) => setPerson1(e.target.value)} 
        />
        <span className="text-2xl font-bold self-center">+</span>
        <input 
          className="p-3 rounded text-black flex-1" 
          placeholder="(Actor/Director)" 
          value={person2} 
          onChange={(e) => setPerson2(e.target.value)} 
        />
        <button onClick={handleFind} className="bg-green-600 px-6 py-3 rounded font-bold">
          {loading ? "Searching..." : "Find Collabs"}
        </button>
      </div>

      {status && <p className="text-xl mb-4 font-semibold">{status}</p>}

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {results.map((m) => (
          m.poster_path && (
            <div 
              key={m.id} 
              className="hover:scale-105 transition cursor-pointer" // Added cursor pointer
              onClick={() => setSelectedMovie(m)} // Open Modal
            >
              <img src={IMG_CDN_URL + m.poster_path} className="rounded" alt={m.title} />
              <p className="mt-2 text-sm">{m.title}</p>
            </div>
          )
        ))}
      </div>

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

export default CollabFinder;