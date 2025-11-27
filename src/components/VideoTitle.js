const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] md:pt-[20%] px-6 md:px-24 absolute text-white z-20">
      <div className="absolute top-0 left-0 w-full h-40 via-black/80 to-transparent -z-10"></div>
      <h1 className="text-2xl md:text-6xl font-bold mt-4 md:mt-0">{title}</h1>
      <p className="inline-block py-2 md:py-6 text-xs md:text-lg w-full md:w-1/4 line-clamp-3 md:line-clamp-none">
        {overview}
      </p>
    </div>
  );
};
export default VideoTitle;