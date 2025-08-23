import { useNavigate } from "react-router-dom";

const CategoryCard = ({ name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const categorySlug = name.toLowerCase();
    navigate(`/category/${categorySlug}`);
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 group"
    >
      <div className="relative aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end justify-center p-4 rounded-2xl">
          <h3 className="text-white text-lg sm:text-xl font-bold drop-shadow-sm text-center">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
