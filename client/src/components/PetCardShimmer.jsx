const PetCardShimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="rounded-3xl bg-gray-200 overflow-hidden shadow-md relative animate-pulse"
          >
            <div className="h-60 bg-gray-300 w-full"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="h-9 bg-gray-300 rounded w-1/2 mt-4"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PetCardShimmer;
