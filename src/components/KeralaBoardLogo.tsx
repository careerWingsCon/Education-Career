import React from 'react';

interface KeralaBoardLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  variant?: 'full' | 'emblem-only';
}

// Government of Kerala Official State Emblem SVG Component
export const KeralaStateEmblem: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer circular badge background */}
      <circle cx="100" cy="100" r="98" fill="#FFFFFF" />
      
      <g stroke="#000000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* ==================== TOP: ASHOKA LIONS ==================== */}
        <g id="AshokaCapital" transform="translate(100, 31)">
          {/* Central Lion Head & Mane */}
          <path d="M0 -15 C-4 -15 -6 -11 -5 -6 C-7 -6 -8 -1 -6 3 C-8 5 -8 10 -4 13 L4 13 C8 10 8 5 6 3 C8 -1 7 -6 5 -6 C6 -11 4 -15 0 -15 Z" fill="#000000" fillOpacity="0.12" />
          <path d="M-3 -12 C-5 -14 -2 -15 0 -15 C2 -15 5 -14 3 -12" strokeWidth="1.8" />
          <path d="M-5 -7 C-7 -8 -7 -4 -5 -3 M5 -7 C7 -8 7 -4 5 -3" />
          {/* Eyes & Snout */}
          <circle cx="-2" cy="-9" r="0.9" fill="#000000" stroke="none" />
          <circle cx="2" cy="-9" r="0.9" fill="#000000" stroke="none" />
          <path d="M-1.5 -6 L0 -4 L1.5 -6 M0 -4 L0 -2" strokeWidth="1.2" />
          {/* Mane curls */}
          <path d="M-4 -4 C-7 -3 -6 1 -4 2 M4 -4 C7 -3 6 1 4 2 M-3 3 C-6 5 -5 8 -2 10 M3 3 C6 5 5 8 2 10" />

          {/* Left Profile Lion */}
          <path d="M-5 -9 C-9 -11 -12 -7 -10 -3 C-13 -1 -12 4 -9 6 L-4 7" strokeWidth="1.4" />
          {/* Right Profile Lion */}
          <path d="M5 -9 C9 -11 12 -7 10 -3 C13 -1 12 4 9 6 L4 7" strokeWidth="1.4" />

          {/* Abacus Base */}
          <path d="M-14 13 L14 13 L12 18 L-12 18 Z" fill="#000000" fillOpacity="0.15" strokeWidth="1.6" />
          {/* Ashoka Chakra in center */}
          <circle cx="0" cy="15.5" r="2.2" strokeWidth="1.2" />
          <path d="M0 13.3 L0 17.7 M-2.2 15.5 L2.2 15.5 M-1.5 14 L1.5 17 M-1.5 17 L1.5 14" strokeWidth="0.8" />
          {/* Bull & Horse accents */}
          <circle cx="-7" cy="15.5" r="1.1" fill="#000000" stroke="none" />
          <circle cx="7" cy="15.5" r="1.1" fill="#000000" stroke="none" />
          {/* Lotus Base */}
          <path d="M-11 18 C-8 22 8 22 11 18 M-8 18 C-5 21 5 21 8 18" strokeWidth="1.2" />
        </g>

        {/* ==================== CENTER: SHANKHA (CONCH) ==================== */}
        <g id="CenterShankha" transform="translate(100, 76)">
          {/* Circular Frame around Shankha */}
          <circle cx="0" cy="0" r="18" strokeWidth="1.4" strokeDasharray="3.5 1.5" />
          <circle cx="0" cy="0" r="15" strokeWidth="1.2" />

          {/* Shankha (Conch Shell) Body */}
          <path d="M0 -12 C5 -12 11 -7 11 0 C11 7 5 12 0 14 C-5 12 -11 7 -11 0 C-11 -7 -5 -12 0 -12 Z" fill="#000000" fillOpacity="0.1" strokeWidth="1.5" />
          {/* Spiral Lines */}
          <path d="M0 -10 C3 -10 7 -6 7 0 C7 5 3 9 0 11 C-3 9 -7 5 -7 0 C-7 -6 -3 -10 0 -10 Z" strokeWidth="1.2" />
          <path d="M0 -7 C2 -7 4 -4 4 0 C4 3 2 6 0 8 C-2 6 -4 3 -4 0 C-4 -4 -2 -7 0 -7 Z" strokeWidth="1" />
          <path d="M0 -4 Q2 0 0 4 Q-2 0 0 -4 Z" fill="#000000" stroke="none" />
        </g>

        {/* ==================== LEFT ELEPHANT ==================== */}
        <g id="LeftElephant" transform="translate(56, 110)">
          {/* Body Outline */}
          <path d="M22 -32 C12 -32 -2 -22 -10 -6 C-16 6 -14 26 -10 38 L-6 38 L-6 22 L2 22 L2 38 L8 38 L8 18 L16 18 L16 38 L22 38 L22 0 C26 -12 26 -24 22 -32 Z" fill="#000000" fillOpacity="0.08" strokeWidth="1.5" />
          {/* Head & Trunk curving up toward the Shankha */}
          <path d="M12 -25 C18 -34 26 -38 30 -48 C28 -50 22 -46 16 -38 C10 -32 6 -26 6 -20" strokeWidth="1.6" />
          {/* Trunk tip curl */}
          <path d="M30 -48 C32 -52 28 -52 26 -48" strokeWidth="1.2" />
          {/* Big Ear */}
          <path d="M4 -22 C-4 -22 -10 -12 -6 0 C-2 8 4 2 4 -22 Z" fill="#FFFFFF" strokeWidth="1.4" />
          <path d="M2 -18 C-3 -18 -7 -10 -4 0" strokeWidth="1" />
          {/* Eye */}
          <circle cx="10" cy="-24" r="1.2" fill="#000000" stroke="none" />
          {/* Tusk */}
          <path d="M14 -16 C20 -14 25 -10 27 -6 C23 -8 17 -12 13 -14 Z" fill="#FFFFFF" strokeWidth="1.2" />
          {/* Back wrinkles & leg details */}
          <path d="M-4 -2 C-2 -4 4 -4 6 -2" strokeWidth="1" />
          <path d="M-6 26 L2 26 M10 26 L18 26" strokeWidth="1.2" />
        </g>

        {/* ==================== RIGHT ELEPHANT (MIRRORED) ==================== */}
        <g id="RightElephant" transform="translate(144, 110) scale(-1, 1)">
          {/* Body Outline */}
          <path d="M22 -32 C12 -32 -2 -22 -10 -6 C-16 6 -14 26 -10 38 L-6 38 L-6 22 L2 22 L2 38 L8 38 L8 18 L16 18 L16 38 L22 38 L22 0 C26 -12 26 -24 22 -32 Z" fill="#000000" fillOpacity="0.08" strokeWidth="1.5" />
          {/* Head & Trunk curving up toward the Shankha */}
          <path d="M12 -25 C18 -34 26 -38 30 -48 C28 -50 22 -46 16 -38 C10 -32 6 -26 6 -20" strokeWidth="1.6" />
          {/* Trunk tip curl */}
          <path d="M30 -48 C32 -52 28 -52 26 -48" strokeWidth="1.2" />
          {/* Big Ear */}
          <path d="M4 -22 C-4 -22 -10 -12 -6 0 C-2 8 4 2 4 -22 Z" fill="#FFFFFF" strokeWidth="1.4" />
          <path d="M2 -18 C-3 -18 -7 -10 -4 0" strokeWidth="1" />
          {/* Eye */}
          <circle cx="10" cy="-24" r="1.2" fill="#000000" stroke="none" />
          {/* Tusk */}
          <path d="M14 -16 C20 -14 25 -10 27 -6 C23 -8 17 -12 13 -14 Z" fill="#FFFFFF" strokeWidth="1.2" />
          {/* Back wrinkles & leg details */}
          <path d="M-4 -2 C-2 -4 4 -4 6 -2" strokeWidth="1" />
          <path d="M-6 26 L2 26 M10 26 L18 26" strokeWidth="1.2" />
        </g>

        {/* ==================== BOTTOM: PEDESTAL & SCROLL ==================== */}
        <g id="BottomScroll" transform="translate(100, 150)">
          {/* Ground / Pedestal line */}
          <path d="M-68 0 Q0 6 68 0" strokeWidth="1.8" />
          
          {/* Banner Ribbons */}
          <path d="M-60 2 Q0 10 60 2 L56 16 Q0 24 -56 16 Z" fill="#FFFFFF" strokeWidth="1.5" />
          <path d="M-52 5 Q0 12 52 5" strokeWidth="1" />

          {/* Banner text: GOVERNMENT OF KERALA */}
          <text x="0" y="12" textAnchor="middle" fontSize="6" fontWeight="900" fontFamily="sans-serif" fill="#000000" stroke="none" letterSpacing="0.6">
            GOVERNMENT OF KERALA
          </text>

          {/* Bottom Ornamental Base Arch */}
          <path d="M-45 20 Q0 28 45 20 M-35 23 Q0 29 35 23" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
};

export const KeralaBoardLogo: React.FC<KeralaBoardLogoProps> = ({ className = '', size = 'responsive', variant = 'full' }) => {
  if (variant === 'emblem-only') {
    return (
      <div className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center p-1 sm:p-1.5 shadow-md border-2 border-white/90 ${className}`}>
        <KeralaStateEmblem className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-5 select-none ${className}`}>
      {/* Circular Emblem Badge */}
      <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center p-1 sm:p-1.5 shadow-md border-2 border-white/90">
        <KeralaStateEmblem className="w-full h-full" />
      </div>

      {/* Text Lines */}
      <div className="flex flex-col text-white justify-center leading-tight">
        <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-100 tracking-wide font-sans">
          Directorate of General Education, Government of Kerala
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans my-0.5 sm:my-1 drop-shadow-xs">
          Kerala Examination Results Portal
        </h1>
        <span className="text-xs sm:text-sm md:text-base text-blue-100/90 font-normal font-sans">
          Official Online Verification Platform For HSE and VHSE examinations
        </span>
      </div>
    </div>
  );
};


