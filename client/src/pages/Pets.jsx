import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import PetCard from "../components/PetCard";
import PetCardSkeleton from "../components/PetCardSkeleton";
import { Plus } from "lucide-react";
import { useAuth } from "../auth/AuthProvider"; // ✅ Import useAuth hook

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Access user from context

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
    <section className="px-6 sm:px-10 md:px-16 py-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800">Adopt a Pet</h2>
          <p className="text-gray-600 mt-1">
            Browse all lovable pets looking for a home ❤️
          </p>
        </div>

        {/* ✅ Conditionally render "Add Pet" button */}
        {user?.role === "owner" && (
          <button
            onClick={() => navigate("/add-pet")}
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition duration-200 ease-in-out"
          >
            <Plus className="w-5 h-5" />
            Add Pet
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <PetCardSkeleton key={index} />
          ))}
        </div>
      ) : pets.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-24">
          <p className="text-xl font-medium">
            No pets available for adoption at the moment.
          </p>
          <p className="text-sm mt-2">Click "Add Pet" to list a new one.</p>
        </div>
      )}
    </section>
  );
};

export default Pets;
