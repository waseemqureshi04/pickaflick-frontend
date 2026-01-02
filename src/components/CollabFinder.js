import { useState } from "react";
import { IMG_CDN_URL, API_BASE_URL } from "../utils/constants";
import MovieModal from "./MovieModal";

const CollabFinder = () => {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchId = async (name) => {
    const res = await fetch(`${API_BASE_URL}/api/tmdb/search/person?query=${name}&page=1`);
    const json = await res.json();
    return json.results.length > 0 ? json.results[0] : null;
  };

  const handleFind = async () => {
    setLoading(true);
    setResults([]);
    setStatus("");

    const p1Data = await fetchId(person1);
    if (!p1Data) {
      setStatus(`Could not find "${person1}"`);
      setLoading(false);
      return;
    }

    const p2Data = await fetchId(person2);
    if (!p2Data) {
      setStatus(`Could not find "${person2}"`);
      setLoading(false);
      return;
    }

    const res = await fetch(
      `${API_BASE_URL}/api/tmdb/discover/movie?with_people=${p1Data.id},${p2Data.id}&sort_by=popularity.desc`
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
      <p className="mb-6 text-gray-400">Enter two names to find their collaborations (e.g., Cillian Murphy & Christopher Nolan)</p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <input 
          className="p-3 bg-black border border-gray-700 rounded text-white flex-1 w-full focus:border-green-600 focus:outline-none placeholder-gray-500" 
          placeholder="(e.g., Actor/Director)" 
          value={person1} 
          onChange={(e) => setPerson1(e.target.value)} 
        />
        <span className="text-2xl font-bold text-gray-500">+</span>
        <input 
          className="p-3 bg-black border border-gray-700 rounded text-white flex-1 w-full focus:border-green-600 focus:outline-none placeholder-gray-500" 
          placeholder="(e.g., Actor/Director)" 
          value={person2} 
          onChange={(e) => setPerson2(e.target.value)} 
        />
        <button onClick={handleFind} className="bg-green-700 hover:bg-green-800 px-8 py-3 rounded font-bold transition-colors w-full md:w-auto">
          {loading ? "Searching..." : "Find Collabs"}
        </button>
      </div>

      {status && (
        <p className={`text-xl mb-6 font-semibold p-4 rounded border ${results.length > 0 ? 'bg-green-900/20 border-green-800 text-green-400' : 'bg-red-900/20 border-red-800 text-red-400'}`}>
            {status}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {results.map((m) => (
          m.poster_path && (
            <div 
              key={m.id} 
              className="bg-black border border-gray-800 p-2 rounded-lg hover:scale-105 transition cursor-pointer hover:border-gray-500"
              onClick={() => setSelectedMovie(m)} 
            >
              <img src={IMG_CDN_URL + m.poster_path} className="rounded w-full" alt={m.title} />
              <p className="mt-2 text-sm font-semibold truncate">{m.title}</p>
            </div>
          )
        ))}
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

export default CollabFinder;