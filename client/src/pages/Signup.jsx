import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Call API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-10/12 p-5 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">
          Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600 font-semibold text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-2 focus:border-pink-400 transition-all duration-150 ease-in"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="********"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-semibold text-sm">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            >
              <option value="">Select role</option>
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
              <option value="delivery">Delivery</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
