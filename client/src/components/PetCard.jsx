import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  PawPrint,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  } = pet;

  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 transform hover:-translate-y-0.5 hover:scale-[1.01]">
      {/* Heart Icon */}
      <button
        onClick={() => setLiked((prev) => !prev)}
        className="absolute top-3 right-3 z-20 bg-white rounded-full p-1 shadow-sm hover:scale-105 transition cursor-pointer"
      >
        <Heart
          className={`w-5 h-5 transition-colors duration-200 ${
            liked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image Section with Arrows Only */}
      <div className="relative group">
        <img
          src={images[currentImageIndex] || "/placeholder-pet.jpg"}
          alt={name}
          className="w-full h-56 object-cover transition duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden group-hover:inline-block transition cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-white drop-shadow-sm" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden group-hover:inline-block transition cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-white drop-shadow-sm" />
            </button>
          </>
        )}
      </div>

      {/* Pet Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <span className="text-sm capitalize text-gray-500">{gender}</span>
        </div>

        <p className="text-sm text-gray-600">
          Breed: {breed || "Unknown"} • Age: {age} yr{age > 1 ? "s" : ""}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex gap-2 flex-wrap text-xs">
          {vaccinated && (
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Vaccinated
            </span>
          )}
          {neutered && (
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Neutered
            </span>
          )}
          {adopted && (
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
              Adopted
            </span>
          )}
        </div>

        <Link
          to={`/pets/${_id}`}
          className="inline-flex items-center mt-3 gap-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          <PawPrint className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
