import ShimmerMovieCard from "./ShimmerMovieCard";

const Shimmer = () => {
  return (
    <div className="bg-black min-h-screen pt-[30%] md:pt-20 px-4">
      {/* Simulate the Hero Section Title */}
      <div className="w-1/3 h-10 bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
      <div className="w-1/2 h-4 bg-gray-700 rounded-lg mb-10 animate-pulse"></div>

      {/* Simulate a Horizontal Row of Cards */}
      <div className="flex overflow-x-scroll gap-4 no-scrollbar">
        {Array(10)
          .fill("")
          .map((_, index) => (
            <ShimmerMovieCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default Shimmer;