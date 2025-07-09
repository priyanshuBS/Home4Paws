const FeaturePetsCard = ({ type, index }) => {
  return (
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
        src={`${type}.jpg`}
        alt={`${type}`}
        className="rounded-xl mb-4 w-full h-54 object-cover"
      />
      <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
      <p className="text-gray-600">
        Meet our lovely {type}s ready to find a new home.
      </p>
      {/* <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300 cursor-pointer">
        Adopt Now
      </button> */}
    </div>
  );
};

export default FeaturePetsCard;
