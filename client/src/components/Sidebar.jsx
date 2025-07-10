import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <p className="text-xl font-bold">Menu</p>
        <X
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <nav className="flex flex-col p-4 space-y-3">
        <Link
          to="/home"
          onClick={() => setIsOpen(false)}
          className="font-semibold px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-100 hover:ring-2 hover:ring-pink-300 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          to="/pets"
          onClick={() => setIsOpen(false)}
          className="font-semibold px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-100 hover:ring-2 hover:ring-pink-300 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Pets
        </Link>
        <Link
          to="/signup"
          onClick={() => setIsOpen(false)}
          className="font-semibold px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-100 hover:ring-2 hover:ring-pink-300 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Create Account
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
