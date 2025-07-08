import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-teal-50 min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 space-y-6 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-teal-700">
          Find Your New Best Friend
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
          Adopt a loving pet today and give them a forever home. Thousands of
          pets are waiting for you.
        </p>
        <a
          href="/home"
          className="inline-block px-8 py-3 bg-teal-600 text-white rounded-full shadow hover:bg-teal-700 transition transform hover:scale-105"
        >
          Adopt Now
        </a>
      </section>

      {/* Featured Pets */}
      <section id="pets" className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-10 animate-slideUp">
          Featured Pets
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Example pet cards */}
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 bg-white animate-fadeInUp"
            >
              <img
                src={`https://placekitten.com/400/30${num}`}
                alt="Pet"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-teal-700">
                  Pet Name {num}
                </h3>
                <p className="text-gray-600">
                  2 years old · Friendly & playful
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
