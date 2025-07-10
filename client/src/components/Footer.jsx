import { PawPrint, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-10 mt-12">
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* about website */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PawPrint className="w-6 h-6 text-white md:w-4 md:h-4" />
            <h2 className="text-2xl font-semibold text-white md:text-[1.1rem]">
              Home4Paws
            </h2>
          </div>
          <p className="text-[0.9rem] text-gray-400 md:text-[0.8rem]">
            Your trusted pet adoption platform. Bringing paws to happy homes.
          </p>
        </div>
        {/* quick links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 md:text-[1rem]">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-300 md:text-[0.8rem] hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 md:text-[0.8rem] hover:text-white"
              >
                Adopt
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 md:text-[0.8rem] hover:text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 md:text-[0.8rem] hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Policies */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 md:text-[1rem]">
            Policies
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-300 md:text-[0.8rem] hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 md:text-[0.8rem] hover:text-white"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        {/* social links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 md:text-[1rem]">
            Follow Us
          </h3>
          <div className="flex space-x-6">
            <Link href="#" className="flex items-center gap-1">
              <Facebook className="w-6 h-6 text-white md:w-4 md:h-4" />
              <span className="text-gray-300 md:text-[0.8rem] hover:text-white">
                Facebook
              </span>
            </Link>
            <Link href="#" className="flex items-center gap-1">
              <Instagram className="w-6 h-6 text-white md:w-4 md:h-4" />
              <span className="text-gray-300 md:text-[0.8rem] hover:text-white">
                Instagram
              </span>
            </Link>
            <Link href="#" className="flex items-center gap-1">
              <Twitter className="w-6 h-6 text-white md:w-4 md:h-4" />
              <span className="text-gray-300 md:text-[0.8rem] hover:text-white">
                Twitter
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
