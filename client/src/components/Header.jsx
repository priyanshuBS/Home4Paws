const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="./animal-shelter.png"
            alt="PetAdopt Logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="text-2xl font-bold text-teal-600">PetAdopt</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="#home"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            About
          </a>
          <a
            href="#pets"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            Pets
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#adopt"
            className="px-5 py-2 bg-teal-600 text-white rounded-full shadow hover:bg-teal-700 transition-colors"
          >
            Adopt Now
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          {/* You can replace this with a hamburger icon + mobile menu */}
          <button className="text-teal-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
