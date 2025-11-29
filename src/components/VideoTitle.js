const VideoTitle = ({ title, overview, onMoreInfoClick }) => {
  return (
    // ✅ FIX: Removed weird margins. Standardized padding to align with movie lists.
    // Mobile: px-6 | Desktop: px-12
    <div className="w-screen aspect-video pt-[35%] md:pt-[20%] px-6 md:px-12 absolute text-white z-20 flex flex-col justify-end pb-12 md:pb-24 h-full">
      
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/60 to-transparent -z-10"></div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/50 to-transparent -z-10"></div>

      {/* ✅ FIX: Responsive text size, no negative margins */}
      <h1 className="text-wrap text-3xl -ml-3 md:text-6xl font-bold drop-shadow-lg leading-tight">
        {title}
      </h1>
      
      <p className="hidden md:inline-block py-6 text-xs -ml-3 md:text-lg w-full md:w-1/3 line-clamp-2 md:line-clamp-3 drop-shadow-md text-gray-200">
        {overview}
      </p>
    </div>
  );
};
export default VideoTitle;