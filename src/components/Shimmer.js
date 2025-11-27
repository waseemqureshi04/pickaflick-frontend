import ShimmerMovieCard from "./ShimmerMovieCard";
const Shimmer = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 flex flex-col justify-center bg-gray-900 animate-pulse relative">
         <div className="w-1/2 md:w-1/3 h-10 bg-gray-700 rounded-lg mb-4"></div>
         <div className="hidden md:block w-1/4 h-20 bg-gray-700 rounded-lg mb-4"></div>
      </div>
      <div className="px-6 -mt-10 md:-mt-52 relative z-20">
        <div className="w-48 h-8 bg-gray-800 rounded mb-4"></div>
        <div className="flex overflow-x-scroll gap-4 no-scrollbar">
          {Array(10)
            .fill("")
            .map((_, index) => (
              <ShimmerMovieCard key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Shimmer;