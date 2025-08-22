import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import PetCard from "../components/PetCard";
import PetCardSkeleton from "../components/PetCardSkeleton";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetsByCategory = async () => {
      try {
        const res = await api.get(`/pets/category?category=${categoryName}`);
        setPets(res?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPetsByCategory();
  }, [categoryName]);

  return (
    <div className="px-4 sm:px-10 lg:px-24 py-14 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 capitalize text-black">
        {categoryName} for Adoption
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <PetCardSkeleton key={i} />)
        ) : pets.length > 0 ? (
          pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No pets found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
