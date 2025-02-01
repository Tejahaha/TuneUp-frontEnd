import React from 'react';

const NavItem = ({ icon, label, isCollapsed, isActive, onClick }) => (
  <button 
    className={`flex items-center space-x-4 w-full p-3 rounded-lg transition-all duration-300
      ${isActive 
        ? 'bg-white/10 text-white' 
        : 'text-white/60 hover:text-white hover:bg-white/5'}`}
    onClick={onClick}
  >
    {icon}
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </button>
);

export default NavItem;
