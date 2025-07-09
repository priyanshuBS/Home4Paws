import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10 text-center mt-10">
      <p className="mb-4">&copy; 2025 PetAdopt. All rights reserved.</p>
      <div className="space-x-6">
        <Link to="" className="hover:underline">
          Facebook
        </Link>
        <Link to="" className="hover:underline">
          Instagram
        </Link>
        <Link to="" className="hover:underline">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
