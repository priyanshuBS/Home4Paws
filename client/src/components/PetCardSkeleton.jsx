const PetCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="h-52 bg-gray-200 w-full" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-20 bg-gray-200 rounded-xl"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default PetCardSkeleton;
