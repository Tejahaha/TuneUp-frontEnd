import React, { useRef, useState, useEffect } from "react";
import { Home, Compass, Clock, Heart, Plus } from "lucide-react";
import Logo from '../Logo';
import NavItem from './NavItem';

const Sidebar = ({ isSidebarOpen, setSidebarOpen, setActiveSection, activeSection }) => {
  const sidebarRef = useRef(null);
  const mouseTimeoutRef = useRef(null);
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const movingTowards = currentX < lastMouseXRef.current;
      lastMouseXRef.current = currentX;

      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }

      if (currentX <= 100 || (movingTowards && currentX <= 150)) {
        setSidebarOpen(true);
        return;
      }

      if (currentX > 288) {
        mouseTimeoutRef.current = setTimeout(() => {
          setSidebarOpen(false);
        }, 200);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [setSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`bg-black border-r border-white/10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <div className={`${!isSidebarOpen ? "hidden" : ""}`}>
          <Logo />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 py-8 space-y-2 opacity-100 transition-opacity duration-500">
        <NavItem
          icon={<Home size={22} />}
          label="Home"
          isCollapsed={!isSidebarOpen}
          isActive={activeSection === 'home'}
          onClick={() => setActiveSection('home')}
        />
        <NavItem
          icon={<Compass size={22} />}
          label="Discover"
          isCollapsed={!isSidebarOpen}
          isActive={activeSection === 'discover'}
          onClick={() => setActiveSection('discover')}
        />
        <NavItem
          icon={<Clock size={22} />}
          label="Recent"
          isCollapsed={!isSidebarOpen}
          isActive={activeSection === 'recent'}
          onClick={() => setActiveSection('recent')}
        />
        <NavItem
          icon={<Heart size={22} />}
          label="Favorites"
          isCollapsed={!isSidebarOpen}
          isActive={activeSection === 'favorites'}
          onClick={() => setActiveSection('favorites')}
        />
      </nav>

      {/* Library Section */}
      <div
        className={`mt-4 px-4 transition-opacity duration-500 ${
          !isSidebarOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-sm uppercase tracking-wider text-white/40">
            Library
          </span>
          <Plus
            size={18}
            className="text-white/40 hover:text-white cursor-pointer"
          />
        </div>
        {["Daily Mix", "Top Hits", "Chill Vibes", "Rock Classics"].map(
          (playlist) => (
            <div
              key={playlist}
              className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer group transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg group-hover:bg-white/15 transition-colors duration-300" />
              <div>
                <p className="text-sm font-medium">{playlist}</p>
                <p className="text-xs text-white/40">14 tracks</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
