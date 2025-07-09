import { PawPrint } from "lucide-react";

const WhyAdoptCard = ({ title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow hover:scale-105 transform transition duration-300">
      <PawPrint className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default WhyAdoptCard;
