import { PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="font-sans text-gray-800">
      <header className="bg-gradient-to-r from-pink-400 to-yellow-300 p-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <PawPrint className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">Home4Paws</span>
        </div>
        <nav className="space-x-6 hidden md:flex">
          <Link className="text-white hover:underline">Featured Pets</Link>
          <Link className="text-white hover:underline">Why Adopt</Link>
          <Link className="text-white hover:underline">Contact</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
