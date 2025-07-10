const WhyAdoptCard = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 transition-transform hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-${color}-100 text-${color}-600 rounded-full text-4xl shadow-inner`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default WhyAdoptCard;
