import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

const LandingPage = () => {
  return (
    <>
      {/* hero section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20 bg-pink-50">
        <div
          className="md:w-1/2 space-y-6 transition-all duration-700 ease-in-out animate-[fadeInLeft_0.8s_ease-in-out]"
          style={{
            animation: "fadeInLeft 0.8s ease-in-out",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600">
            Find your <span className="text-yellow-500">new best friend</span>
          </h1>
          <p className="text-lg text-gray-600">
            Thousands of pets are waiting for a loving home. Start your journey
            today.
          </p>
          <Link to="/home">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300 cursor-pointer">
              Explore Pets
            </button>
          </Link>
        </div>
        <img
          src="./animal-shelter.png"
          alt="Happy pet"
          className="w-full md:w-1/3 rounded-3xl mt-10 md:mt-0 shadow-xl md:px-4 transition-all duration-700 ease-in-out animate-[fadeInRight_0.8s_ease-in-out]"
          style={{
            animation: "fadeInRight 0.8s ease-in-out",
          }}
        />
      </section>
      {/* Featured Pets */}
      <section className="p-10 md:p-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-12">
          Featured Pets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["dog", "cat", "rabbit"].map((type, index) => (
            <div
              key={type}
              className={`bg-pink-50 p-6 rounded-2xl shadow hover:scale-105 transform transition duration-300 ease-in-out animate-[fadeInUp_${
                0.5 + index * 0.3
              }s_ease-in-out]`}
              style={{
                animation: `fadeInUp ${0.5 + index * 0.3}s ease-in-out`,
              }}
            >
              <img
                src={`https://source.unsplash.com/400x300/?${type}`}
                alt={`${type}`}
                className="rounded-xl mb-4 w-full h-52 object-cover"
              />
              <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
              <p className="text-gray-600 mb-4">
                Meet our lovely {type}s ready to find a new home.
              </p>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300 cursor-pointer">
                Adopt Now
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* Why Adopt */}
      <section id="why" className="p-10 md:p-20 bg-yellow-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mb-12">
          Why Adopt?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white shadow hover:scale-105 transform transition duration-300">
            <PawPrint className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save a Life</h3>
            <p className="text-gray-600">
              Millions of animals need homes. Your adoption changes everything.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow hover:scale-105 transform transition duration-300">
            <PawPrint className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health Checked</h3>
            <p className="text-gray-600">
              All pets are vaccinated and health-checked before adoption.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow hover:scale-105 transform transition duration-300">
            <PawPrint className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lifetime Support</h3>
            <p className="text-gray-600">
              Get guidance from our team to help you with your new friend.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
