import { PawPrint, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white shadow-2xl font-sans h-16 w-full flex items-center justify-between md:px-16 px-4">
      <div className="flex items-center gap-2">
        <PawPrint className="w-8 h-8 text-pink-600" />
        <Link to="landing-page">
          <p className="text-2xl font-bold text-pink-600 cursor-pointer">
            Home4Paws
          </p>
        </Link>
      </div>
      <div className="md:flex items-center gap-10 hidden">
        <Link
          to="/home"
          className="text-gray-800 hover:text-pink-600 font-semibold hover:underline transition-all duration-200 ease-in "
        >
          Home
        </Link>
        <Link
          to="/pets"
          className="text-gray-800 hover:text-pink-600 font-semibold hover:underline transition-all duration-200 ease-in"
        >
          Pets
        </Link>
        <Link
          to="/signup"
          className="flex items-center gap-1 bg-gray-800 text-white px-4 py-2 rounded-3xl font-semibold hover:bg-pink-600 transition-all duration-300 ease-in-out"
        >
          <User className="w-5 h-5" />
          <span>Signup</span>
        </Link>
      </div>
      <div className="md:hidden">
        <Menu
          className="w-8 h-8 text-pink-600"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}

      {isOpen && (
        <div
          className="fixed inset-0 z-0 bg-transparent"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
