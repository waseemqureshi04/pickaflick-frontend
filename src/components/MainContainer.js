import { useSelector } from "react-redux";
import { useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import Shimmer from "./Shimmer"; 
import MovieModal from "./MovieModal";

const MainContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Use Shimmer if movies are not loaded yet
  if (!movies) return <Shimmer />;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-0 bg-black md:pt-0 relative group">
      <VideoTitle 
        title={original_title} 
        overview={overview} 
        onMoreInfoClick={() => setShowModal(true)} 
      />
      <VideoBackground movieId={id} />

      {showModal && (
        <MovieModal movie={mainMovie} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
export default MainContainer;