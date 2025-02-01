import React from 'react';
import Featured from './mainsectioncomponents/FeaturedSection';
import TrendingNow from './mainsectioncomponents/TrendingNowSection';
import DiscoverSection from './sidebarComponents/DiscoverSection';
import FavouritesSection from './sidebarComponents/FavouritesSection';
import RecentsSection from './sidebarComponents/RecentsSection';

const MainContent = ({ togglePlayPause }) => {
  return (
    <main
    className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded transition-colors duration-200"
    >
      <Featured togglePlayPause={togglePlayPause} />
      <TrendingNow />
      <DiscoverSection/>
      <FavouritesSection/>
      <RecentsSection/>
    </main>
  );
};

export default MainContent;

