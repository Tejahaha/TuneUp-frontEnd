import React from 'react';
import { Play } from 'lucide-react';

const FeaturedSection = ({ togglePlayPause }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured</h2>
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="group relative aspect-[16/9] bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-4 bg-white rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                onClick={togglePlayPause}
              >
                <Play size={24} className="text-black" fill="black" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;