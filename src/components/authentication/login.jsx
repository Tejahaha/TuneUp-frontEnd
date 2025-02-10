import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userService } from "../../services/api";
import { FaMusic, FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(email, password);
      toast.success("Welcome back!");
      navigate("/app");
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password");
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="text-center">
          <FaMusic className="mx-auto h-12 w-auto text-yellow-400 animate-bounce" />
          <h2 className="mt-6 text-3xl font-extrabold text-yellow-300">Welcome back to TuneUp</h2>
          <p className="mt-2 text-sm text-gray-400">Let's get back to the rhythm</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Password"
              />
            </div>
          </div>
          {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300"
            >
              Sign in and feel the beat
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors duration-300">
              <FaGoogle className="h-5 w-5 text-yellow-400" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors duration-300">
              <FaApple className="h-5 w-5 text-yellow-400" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors duration-300">
              <FaFacebookF className="h-5 w-5 text-yellow-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
