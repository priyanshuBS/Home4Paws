// src/components/PetInfoShimmer.jsx
const PetInfoShimmer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-100 to-gray-50 via-gray-100 animate-pulse">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT - Image Skeleton */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden bg-gray-200" />

          {/* RIGHT - Info Skeleton */}
          <div className="sm:p-8 flex flex-col justify-between gap-8 p-4">
            {/* Header Section */}
            <div className="space-y-3">
              <div className="h-8 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-6 w-24 bg-gray-200 rounded-full" />
                <div className="h-6 w-28 bg-gray-200 rounded-full" />
              </div>
            </div>

            {/* Pet Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-3/4" />
              ))}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="h-10 w-full sm:w-40 bg-gray-200 rounded-lg" />
              <div className="h-10 w-full sm:w-40 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfoShimmer;
