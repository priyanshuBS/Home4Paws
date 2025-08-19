const OwnerDashboardShimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 animate-pulse"
        >
          {/* Title */}
          <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

          {/* Pet */}
          <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>

          {/* Customer */}
          <div className="h-4 w-36 bg-gray-200 rounded mb-2"></div>

          {/* Status */}
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>

          {/* Requested At */}
          <div className="h-4 w-48 bg-gray-200 rounded mb-5"></div>

          {/* Buttons */}
          <div className="flex gap-3 mt-auto">
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded mt-3"></div>
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboardShimmer;
