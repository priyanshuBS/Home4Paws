// src/components/PetCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  PawPrint,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToggleLike } from "../hooks/useToggleLike.js";
import { useAuth } from "../auth/AuthProvider"; // ensure this provides user object

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
  const { isLiked, toggleLike, likeCount } = useToggleLike(
    likedBy,
    _id,
    user?._id
  );
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
    <div className="bg-white rounded-2xl relative shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden max-w-sm">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute top-3 right-3 z-10 bg-white cursor-pointer rounded-full p-1 shadow hover:scale-105 transition"
        title={isLiked ? "Unlike" : "Like"}
      >
        <Heart
          className={`w-5 h-5 transition ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Like Count */}
      <span className="absolute top-3 right-10 bg-white text-xs text-gray-700 px-2 py-0.5 rounded-full shadow">
        {likeCount}
      </span>

      {/* Image Carousel */}
      <div className="relative group w-full h-56">
        <img
          src={images[currentImageIndex] || "/placeholder-pet.jpg"}
          alt={name}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hidden group-hover:block cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hidden group-hover:block cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Pet Info */}
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500 capitalize">{gender}</span>
        </div>

        <p className="text-sm text-gray-600">
          {breed || "Unknown"} • {age} yr{age > 1 ? "s" : ""}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap text-xs">
          {vaccinated && (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Vaccinated
            </span>
          )}
          {neutered && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              Neutered
            </span>
          )}
          {adopted && (
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              Adopted
            </span>
          )}
        </div>

        <Link
          to={`/pets/${_id}`}
          className="inline-block mt-3 w-full text-center bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          <div className="flex items-center justify-center gap-1">
            <PawPrint className="w-4 h-4" />
            View Details
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
