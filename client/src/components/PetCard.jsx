import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  PawPrint,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToggleLike } from "../hooks/useToggleLike";
import { useAuth } from "../auth/AuthProvider";

const PetCard = ({ pet }) => {
  const {
    _id,
    name,
    age,
    breed,
    gender,
    location,
    images = [],
    vaccinated,
    neutered,
    adopted,
    likedBy = [],
  } = pet;

  const { user } = useAuth();
  const { isLiked, toggleLike } = useToggleLike(likedBy, _id, user?._id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    if (!user) {
      alert("Please login to like this pet.");
      return;
    }
    toggleLike();
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 max-w-sm transition hover:shadow-md overflow-hidden p-3">
      {/* Pet Image */}
      <div className="relative rounded-2xl group w-full h-56 sm:h-56 overflow-hidden">
        <img
          src={images[currentImageIndex] || "/placeholder-pet.jpg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Like Heart */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 hover:scale-110 transition z-10 cursor-pointer"
          title={isLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`w-6 h-6 ${
              isLiked ? "fill-pink-500 text-pink-500" : "text-gray-300"
            }`}
          />
        </button>
        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full hidden group-hover:block cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full hidden group-hover:block cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </>
        )}
      </div>

      {/* Pet Info */}
      <div className="p-3 space-y-3 bg-white rounded-b-2xl border-t border-gray-100">
        {/* Name + Gender */}
        <div className="flex justify-between items-center">
          <h2 className="font-serif text-xl font-bold text-gray-900">{name}</h2>
          <span className="text-xs px-3 py-0.5 rounded-full bg-pink-50 text-pink-600 capitalize tracking-wide font-medium">
            {gender}
          </span>
        </div>

        {/* Breed + Age */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-700 font-medium">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            {breed || "Unknown"}
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            {age} yr{age > 1 ? "s" : ""}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 text-xs font-medium mt-2 flex-wrap">
          {vaccinated && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
              💉 Vaccinated
            </span>
          )}
          {neutered && (
            <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
              🧪 Neutered
            </span>
          )}
          {adopted && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full">
              ❤️ Adopted
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link
          to={`/pets/${_id}`}
          className="mt-2 w-full flex justify-center items-center gap-2 px-5 py-2 rounded-xl border border-black hover:bg-gray-800 hover:text-white  transition text-sm font-medium"
        >
          <PawPrint className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
