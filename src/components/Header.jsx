import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-8 py-6 flex items-center justify-between bg-black/30 backdrop-blur-xl sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
        <input
          type="text"
          placeholder="Search music..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>
      {/* <div className="flex items-center space-x-2">
        <Link to="/SignUp">
          <button className="px-8 py-2.5 text-sm border border-white/10 rounded-full hover:bg-white/5 transition-colors">
            Sign Up
          </button>
        </Link>
        <Link to="/Login">
          <button className="px-8 py-2.5 text-sm bg-white text-black rounded-full hover:bg-white/90 transition-colors">
            Log In
          </button>
        </Link>
      </div> */}
    </header>
  );
};

export default Header;
