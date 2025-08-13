import { useEffect, useState } from "react";
import { api } from "../api/api";
import PetCard from "../components/PetCard";
import PetCardSkeleton from "../components/PetCardSkeleton";
import CategoryCard from "../components/CategoryCard";

const categories = [
  { name: "Dogs", image: "/assets/dog.jpg" },
  { name: "Cats", image: "/assets/cat.jpg" },
  { name: "Birds", image: "/assets/bird.jpg" },
  { name: "Rabbits", image: "/assets/rabbit.jpg" },
  { name: "Others", image: "/assets/other.jpg" },
];

const HomePage = () => {
  const [recentPets, setRecentPets] = useState([]);
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const [recentRes, featuredRes] = await Promise.all([
          api.get("/pets/recent"),
          api.get("/pets/featured"),
        ]);

        setRecentPets(recentRes?.data?.data || []);
        setFeaturedPets(featuredRes?.data?.data || []);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setFeaturedPets([]);
        setRecentPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="px-4 sm:px-10 lg:px-24 py-14 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <section className="text-center mb-20">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-black mb-4">
          Adopt Love Today
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
          Find your perfect furry friend from our wide selection of pets. Give
          them a second chance at a happy life.
        </p>
      </section>

      {/* Categories Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-black text-center underline decoration-pink-500">
          Choose by Pet Type
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          🐾 Recently Added
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Meet the newest companions waiting to meet you!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <PetCardSkeleton key={i} />
              ))
            : recentPets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          🌟 Featured Pets
        </h2>
        <p className="text-center text-gray-500 mb-8">
          These pets are specially chosen and need a forever home soon.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <PetCardSkeleton key={`featured-${i}`} />
              ))
            : featuredPets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
