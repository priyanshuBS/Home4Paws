import { PawPrint, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4 md:px-10">
        {/* Mobile view (simple) */}
        <div className="md:hidden flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-white" />
            <h2 className="text-[1.2rem] font-semibold text-white">
              Home4Paws
            </h2>
          </div>
          <p className="text-gray-400 text-[0.8rem] max-w-xs">
            Your trusted pet adoption platform. Bringing paws to happy homes.
          </p>
          <div className="flex gap-6 mt-2">
            <a href="#" className="text-gray-300 hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Desktop view (detailed) */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {/* About website */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Home4Paws</h2>
            </div>
            <p className="text-sm text-gray-300">
              Your trusted pet adoption platform. Bringing paws to happy homes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 text-sm hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/pets"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  Adopt
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-white"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-white"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 text-sm hover:text-white"
                >
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
