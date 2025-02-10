import React, { useState } from "react";
import { FaMusic, FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userService } from "../../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.register(formData.username, formData.email, formData.password);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Signup failed");
      toast.error(error.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="text-center">
          <FaMusic className="mx-auto h-12 w-auto text-yellow-400 animate-bounce" />
          <h2 className="mt-6 text-3xl font-extrabold text-yellow-300">Join TuneUp Today</h2>
          <p className="mt-2 text-sm text-gray-400">Create an account to start streaming</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-gray-700"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>
          {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300"
            >
              Sign Up & Start Listening
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or sign up with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors duration-300">
              <FaGoogle className="h-5 w-5 text-yellow-400" />
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors duration-300">
              <FaApple className="h-5 w-5 text-yellow-400" />
            </button>
            <button className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors duration-300">
              <FaFacebookF className="h-5 w-5 text-yellow-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
