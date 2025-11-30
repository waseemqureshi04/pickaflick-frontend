import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, onClick }) => {
  if (!movie?.poster_path) return null;

  return (
    <div 
      className="w-32 md:w-44 flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-20 relative"
      onClick={() => onClick(movie)}
    >
      <img 
        className="rounded-md w-full h-full object-cover shadow-lg hover:shadow-2xl hover:shadow-red-900/40"
        alt={movie.title} 
        src={IMG_CDN_URL + movie.poster_path}
        loading="lazy" 
      />
    </div>
  );
};

export default MovieCard;