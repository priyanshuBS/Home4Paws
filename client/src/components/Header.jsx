import { PawPrint, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="font-sans text-gray-800">
      <header className="bg-gradient-to-r from-pink-400 to-yellow-300 px-4 md:px-8 py-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <PawPrint className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">Home4Paws</span>
        </div>
        <nav className="space-x-8 hidden md:flex">
          <Link to="/pets" className="text-pink-800 hover:underline">
            Pets
          </Link>
          <Link to="/create-account" className="text-pink-800 hover:underline">
            Create Account
          </Link>
        </nav>
        <div className="md:hidden">
          <Menu
            className="w-8 h-8 text-white cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-pink-100 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <span className="text-xl font-bold text-pink-800">Menu</span>
          <X
            className="w-6 h-6 text-pink-800 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <nav className="flex flex-col p-6 space-y-6">
          <Link
            to="/pets"
            className="text-gray-700 hover:text-pink-800 text-[1.1rem] font-medium"
            onClick={() => setIsOpen(false)}
          >
            Pets
          </Link>
          <Link
            to="/create-account"
            className="text-gray-700 hover:text-pink-800 text-[1.1rem] font-medium"
            onClick={() => setIsOpen(false)}
          >
            Create Account
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-70"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
