import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api"; // Adjust based on your actual path

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchPets = async () => {
  //     try {
  //       const res = await api.get("/pets");
  //       setPets(res?.data?.data || []); // assuming { data: { data: [pets] } }
  //     } catch (error) {
  //       console.error("Failed to fetch pets:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPets();
  // }, []);

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Adoptable Pets</h2>
        <button
          onClick={() => navigate("/add-pet")}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl font-medium shadow-md transition duration-200 ease-in-out cursor-pointer"
        >
          + Add Pet
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 text-center">Loading pets...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {pet.name}
                  </h3>
                  <p className="text-sm text-gray-600">Breed: {pet.breed}</p>
                  <p className="text-sm text-gray-600">Age: {pet.age}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No pets available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Pets;
