import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerMovieCard from "./ShimmerMovieCard";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, loading } = useSelector((store) => store.gpt);
  if (loading) {
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg">
        {Array(3).fill("").map((_, i) => (
            <div key={i} className="mb-6">
                <div className="w-40 h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="flex overflow-x-scroll no-scrollbar gap-4">
                     {Array(7).fill("").map((_, j) => <ShimmerMovieCard key={j} />)}
                </div>
            </div>
         ))}
      </div>
    );
  }

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;