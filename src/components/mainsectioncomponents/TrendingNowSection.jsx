import React from 'react';

const TrendingNowSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
      <div className="grid grid-cols-6 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-square bg-white/5 rounded-xl mb-3 group-hover:bg-white/10 transition-colors" />
            <h3 className="font-medium text-sm truncate">Track Name</h3>
            <p className="text-xs text-white/40 truncate">Artist Name</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingNowSection;
