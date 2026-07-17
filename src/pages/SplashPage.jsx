import React from 'react';

export default function SplashPage() {
  return (
    <div className="w-full h-screen bg-[#f5f9ed] flex items-center justify-center relative overflow-hidden sm:max-w-md sm:h-[800px] sm:rounded-[30px] sm:shadow-2xl sm:mx-auto">
      <div className="w-[296px] h-auto flex flex-col items-center">
        {/* We use standard HTML img with src pointing to the public folder */}
        <img 
          src="/assets/figma/gora_logo.png" 
          alt="Gora Logo" 
          className="w-full h-auto object-contain pointer-events-none animate-pulse"
        />
      </div>
    </div>
  );
}
