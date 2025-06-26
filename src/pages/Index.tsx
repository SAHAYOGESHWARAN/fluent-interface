import React from 'react';
import HeroSection from '../components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-[200vh] bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-x-hidden">
      <HeroSection />
      {/* Example extra content to enable scroll and make the page more visually interesting */}
      <div className="w-full max-w-3xl mx-auto mt-32 p-8 rounded-2xl bg-white/80 shadow-xl text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Scroll Down for More</h2>
        <p className="mb-2">This section is here to ensure the page is scrollable and to demonstrate the floating icons effect as you scroll up and down.</p>
        <p className="mb-2">You can add more content here, such as features, testimonials, or any other information relevant to your product or site.</p>
        <p className="mb-2">Try scrolling up and down to see the icons animate in and out of the center!</p>
      </div>
      <div className="h-[60vh]" />
    </div>
  );
};

export default Index;
