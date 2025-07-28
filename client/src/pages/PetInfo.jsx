import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PetInfo = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/pets/${petId}`);
        setPet(res?.data?.data);
      } catch (err) {
        console.error("Failed to fetch pet:", err);
        toast.error("Failed to load pet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (pet?.images?.length || 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (pet?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleAdoptNow = async () => {
    try {
      const res = await api.post(`/adoption/request/${petId}`);
      toast.success(res?.data?.message);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to request adoption";
      toast.error(message);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!pet)
    return <div className="text-center p-4 text-red-600">Pet not found.</div>;

  const {
    name,
    species,
    breed,
    age,
    gender,
    description,
    vaccinated,
    neutered,
    adopted,
    adoptionDate,
    location,
    images = [],
    owner,
  } = pet;

  return (
    <div className="w-full bg-gradient-to-r from-gray-100 to-gray-50 via-gray-100">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT - Image Carousel */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden group sm:p-8 p-2">
            <img
              src={images[currentImageIndex] || "/placeholder-pet.jpg"}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow hidden group-hover:block cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow hidden group-hover:block cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </>
            )}
          </div>

          {/* RIGHT - Info */}
          <div className="sm:p-8 flex flex-col justify-between gap-8 p-4">
            {/* Header Section */}
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {name}
              </h2>
              <p className="text-base text-gray-500">
                <span className="text-indigo-600 font-semibold">{breed}</span> •{" "}
                {species}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  Age: {age} year{age > 1 && "s"}
                </span>
                <span className="bg-pink-50 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
                  Gender: {gender}
                </span>
                <span className="bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1 rounded-full">
                  Location: {location}
                </span>
              </div>
            </div>

            {/* Pet Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Vaccinated:</span>{" "}
                <span
                  className={
                    vaccinated
                      ? "text-emerald-600 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {vaccinated ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-medium">Neutered:</span>{" "}
                <span
                  className={
                    neutered
                      ? "text-emerald-600 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {neutered ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-medium">Adopted:</span>{" "}
                <span
                  className={
                    adopted
                      ? "text-emerald-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {adopted ? "Yes" : "No"}
                </span>
              </div>
              {adoptionDate && (
                <div>
                  <span className="font-medium">Adopted On:</span>{" "}
                  <span className="text-gray-600">
                    {new Date(adoptionDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  About {name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="w-full sm:w-auto bg-neutral-900 hover:bg-black text-white text-sm font-semibold px-6 py-2 rounded-lg transition-all cursor-pointer">
                Chat with Owner
              </button>
              {!adopted && (
                <button
                  onClick={handleAdoptNow}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:brightness-110 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-all cursor-pointer"
                >
                  Adopt Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
