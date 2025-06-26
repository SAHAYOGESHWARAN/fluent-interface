
import React from 'react';
import FeedbackZone from './FeedbackZone';
import FloatingIcons from './FloatingIcons';

const HeroSection = () => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <FloatingIcons />
      
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your feedback hub,{' '}
          <span className="block text-gray-900">on autopilot</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-500 mb-16 max-w-2xl mx-auto leading-relaxed">
          Cycle is the fastest way for your team to capture product feedback and 
          share customer insights – without the busywork.
        </p>
        
        <FeedbackZone />
        
        <div className="mt-12 text-sm text-gray-400 flex items-center justify-center gap-2">
          <span>tally</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
