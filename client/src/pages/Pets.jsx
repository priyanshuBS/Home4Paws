import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import PetCard from "../components/PetCard";
import PetCardSkeleton from "../components/PetCardSkeleton";
import { Plus } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/pets/petsData");
        setPets(res?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <section className="px-4 sm:px-10 lg:px-20 py-12 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-1 tracking-tight">
            🐶 Adopt a Pet
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover lovable companions waiting for a forever home.
          </p>
        </div>

        {/* Conditionally render Add Pet Button */}
        {user?.role === "owner" && (
          <button
            onClick={() => navigate("/add-pet")}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl text-sm sm:text-base font-semibold shadow transition"
          >
            <Plus className="w-5 h-5" />
            Add Pet
          </button>
        )}
      </div>

      {/* Pet Grid */}
      <div className="min-h-[300px]">
        {loading ? (
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <PetCardSkeleton key={index} />
            ))}
          </div>
        ) : pets.length > 0 ? (
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <img
              src="/assets/no-pets.svg"
              alt="No pets"
              className="w-48 mb-6 opacity-80"
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
              No pets listed yet
            </h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              It looks like there are currently no pets available for adoption.
              Be the first to add a furry friend!
            </p>
            {user?.role === "owner" && (
              <button
                onClick={() => navigate("/add-pet")}
                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium shadow transition"
              >
                Add Your First Pet
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pets;
