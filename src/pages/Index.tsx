import React from 'react';
import HeroSection from '../components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-x-hidden">
      <HeroSection />
      {/* Example extra content to enable scroll and make the page more visually interesting */}
      <div className="w-full max-w-3xl mx-auto mt-32 p-8 rounded-2xl bg-white/80 shadow-xl text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Scroll Down for More</h2>

      </div>
      <div className="h-[60vh]" />
    </div>
  );
};

export default Index;
