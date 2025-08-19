import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result?.success) {
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 px-4 py-14">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-10/12 p-5 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">
          Welcome back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-2 focus:border-pink-400 transition-all duration-150 ease-in"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-2 focus:border-pink-400 transition-all duration-150 ease-in"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-2 focus:border-pink-400 transition-all duration-150 ease-in"
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
            disabled={authLoading}
            className={`w-full py-2.5 mt-2 flex justify-center items-center ${
              authLoading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 cursor-pointer"
            } text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in`}
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
