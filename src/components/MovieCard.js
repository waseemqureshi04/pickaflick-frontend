import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, onClick }) => {
  if (!movie?.poster_path) return null;

  return (
    <div 
      className="w-36 md:w-48 cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-20"
      onClick={() => onClick(movie)}
    >
      <img 
        className="rounded-lg shadow-lg " // Added Rounded corners and shadow
        alt={movie.title} 
        src={IMG_CDN_URL + movie.poster_path} 
      />
    </div>
  );
};

export default MovieCard;