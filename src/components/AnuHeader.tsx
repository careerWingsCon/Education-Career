import React from 'react';
import { KeralaBoardLogo } from './KeralaBoardLogo';

export const AnuHeader: React.FC = () => {
  return (
    <header className="w-full bg-white select-none border-b border-gray-200 print:border-none">
      {/* Top Accredited Banner */}
      <div className="relative w-full bg-[#135062] text-white py-1.5 px-4 text-center font-bold text-sm sm:text-base flex items-center justify-center overflow-hidden">
        {/* Orange left slant accent */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-[#E95A32] w-16 sm:w-28"
          style={{ clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)' }}
        />
        <span className="relative z-10 tracking-wide font-sans text-xs sm:text-sm md:text-base">
          Accredited Board Examination &amp; Result Verification Portal
        </span>
      </div>

      {/* Main Header Container with Kerrala Board Un Edu Logo */}
      <div className="max-w-4xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-center">
        <KeralaBoardLogo size="responsive" />
      </div>
    </header>
  );
};
