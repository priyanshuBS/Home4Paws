import { Link } from "react-router-dom";
import PetCardShimmer from "../components/PetCardShimmer";
import { useState, useEffect } from "react";
import WhyAdoptCard from "../components/WhyAdoptCard";
import { api } from "../api/api";
import toast from "react-hot-toast";

const LandingPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await api.get("/pets/featured");
        const petData = response?.data?.data || [];
        setPets(petData.slice(0, 3));
        setLoading(false);
      } catch (error) {
        toast.error("Error! While fetching data");
      }
    };
    fetchPetData();
  }, []);
  return (
    <div className="bg-gray-100 px-2 md:px-6">
      {/* hero section */}
      <section className=" py-24 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col items-center relative z-10 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-sm">
            Adopt Your <span className="text-pink-600">Furry Friend</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Open your heart and home to a pet waiting to shower you with
            unconditional love. Every adoption changes a life — including yours.
          </p>
          <Link
            to="/home"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
      {/* Featured Pets section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Pets
          </h2>
          {loading ? (
            <PetCardShimmer />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {pets.map((pet, idx) => (
                <div
                  key={pet?._id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl p-4"
                >
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-60 object-cover rounded-2xl"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {pet.name}
                    </h3>
                    <p className="text-gray-600 mb-1">{pet.breed}</p>
                    <p className="text-gray-500 text-sm mb-4">{pet.age} old</p>
                    <Link
                      to={`/pets/${pet?._id}`}
                      className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow transition duration-300"
                    >
                      Adopt Me
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Why adopt section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Why Adopt From Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <WhyAdoptCard
              title="Save a Life"
              description="Every adoption gives a loving animal a forever home and a second
                chance at life."
              icon="🐾"
              color="pink"
            />
            <WhyAdoptCard
              title="Affordable"
              description="Lower costs than buying from breeders, plus pets are vaccinated
                & health-checked."
              icon="❤️"
              color="yellow"
            />
            <WhyAdoptCard
              title="Support Community"
              description="Your adoption fees help us rescue, care for, and rehome more
                animals in need."
              icon="🏠"
              color="rose"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
