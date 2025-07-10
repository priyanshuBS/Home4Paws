import { PawPrint, Menu } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-pink-400 shadow-lg font-sans h-16 w-full flex items-center justify-between md:px-8 px-4">
      <div className="flex items-center gap-2">
        <PawPrint className="w-8 h-8 text-white" />
        <p className="text-2xl font-bold text-white">Home4Paws</p>
      </div>
      <div className="md:flex items-center gap-6 hidden">
        <Link to="/home" className="text-white font-semibold hover:underline">
          Home
        </Link>
        <Link to="/pets" className="text-white font-semibold hover:underline">
          Pets
        </Link>
        <Link to="/signup" className="text-white font-semibold hover:underline">
          Create Account
        </Link>
      </div>
      <div className="md:hidden">
        <Menu className="w-8 h-8 text-white" onClick={() => setIsOpen(true)} />
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
