import { PawPrint, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-10 mt-12">
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* about website */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-[1rem] font-semibold text-white md:text-[1.4rem]">
              Home4Paws
            </h2>
          </div>
          <p className="text-[0.8rem] text-gray-300 md:text-[0.8rem]">
            Your trusted pet adoption platform. Bringing paws to happy homes.
          </p>
        </div>
        {/* quick links */}
        <div>
          <h3 className="text-[1rem] font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-300 text-[0.8rem] hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 text-[0.8rem] hover:text-white"
              >
                Adopt
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 text-[0.8rem] hover:text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-300 text-[0.8rem] hover:text-white "
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Policies */}
        <div className="hidden sm:block">
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
          <h3 className="text-[1rem] font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-6">
            <Link href="#" className="flex items-center gap-1">
              <Facebook className="w-5 h-5 text-white md:w-4 md:h-4" />
              <span className="text-gray-300 text-[0.8rem] hover:text-white">
                Facebook
              </span>
            </Link>
            <Link href="#" className="flex items-center gap-1">
              <Instagram className="w-5 h-5 text-white md:w-4 md:h-4" />
              <span className="text-gray-300 text-[0.8rem] hover:text-white">
                Instagram
              </span>
            </Link>
            <Link href="#" className="flex items-center gap-1">
              <Twitter className="w-5 h-5 text-white md:w-4 md:h-4" />
              <span className="text-gray-300 text-[0.8rem] hover:text-white">
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
