import React from 'react';

interface KeralaBoardLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
}

export const KeralaBoardLogo: React.FC<KeralaBoardLogoProps> = ({ className = '', size = 'responsive' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 780 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          size === 'sm'
            ? 'h-12 w-auto'
            : size === 'md'
            ? 'h-16 w-auto'
            : size === 'lg'
            ? 'h-24 w-auto'
            : 'w-full max-w-[550px] sm:max-w-[650px] h-auto drop-shadow-xs'
        }
      >
        {/* ==================== LEFT EMBLEM ==================== */}
        <g id="EmblemGroup">
          {/* 3 Stars at the top */}
          <path d="M110 18 L112.5 24 L119 24.5 L114 29 L115.5 35 L110 31.5 L104.5 35 L106 29 L101 24.5 L107.5 24 Z" fill="#0B387A" />
          <path d="M85 24 L87.2 29.5 L93 30 L88.5 34 L89.8 39.5 L85 36.5 L80.2 39.5 L81.5 34 L77 30 L82.8 29.5 Z" fill="#0B387A" />
          <path d="M135 24 L137.2 29.5 L143 30 L138.5 34 L139.8 39.5 L135 36.5 L130.2 39.5 L131.5 34 L127 30 L132.8 29.5 Z" fill="#0B387A" />

          {/* Outer Ring Arc */}
          <path
            d="M32 155 C12 120 18 65 52 40 C75 22 145 22 168 40 C202 65 208 120 188 155"
            fill="none"
            stroke="#0B387A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M22 150 C5 110 12 55 48 30 C75 12 145 12 172 30 C208 55 215 110 198 150"
            fill="none"
            stroke="#0B387A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Graduation Cap (Mortarboard) */}
          <g transform="translate(110, 52)">
            {/* Cap top diamond */}
            <path d="M0 -18 L48 -4 L0 10 L-48 -4 Z" fill="#0B387A" />
            {/* Cap inner detail line */}
            <path d="M0 -14 L40 -2 L0 8 L-40 -2 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Cap base skull cap */}
            <path d="M-22 2 C-22 12 22 12 22 2 L22 -1 C22 8 -22 8 -22 -1 Z" fill="#0B387A" />
            {/* Tassel cord & hanging button */}
            <circle cx="0" cy="-4" r="2.5" fill="#FFFFFF" />
            <path d="M0 -4 Q24 -2 28 12 Q29 20 28 26" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M26 24 L30 38 L24 38 Z" fill="#0B387A" />
          </g>

          {/* Left Laurel Wreath Leaves (Green) */}
          <g fill="#2B7B38">
            <path d="M50 62 C40 60 32 70 38 76 C46 72 48 64 50 62 Z" />
            <path d="M42 78 C32 78 26 88 34 92 C40 88 42 80 42 78 Z" />
            <path d="M38 96 C28 98 24 108 32 112 C38 106 38 98 38 96 Z" />
            <path d="M38 114 C28 118 26 128 34 132 C40 126 38 116 38 114 Z" />
            <path d="M44 132 C34 138 34 148 42 150 C46 144 44 134 44 132 Z" />
            
            {/* Inner row leaves */}
            <path d="M60 74 C52 70 48 80 54 84 C60 80 60 76 60 74 Z" />
            <path d="M54 90 C46 88 42 98 48 102 C54 98 54 92 54 90 Z" />
            <path d="M50 108 C42 108 38 118 46 122 C52 116 50 110 50 108 Z" />
            <path d="M54 126 C46 128 44 138 52 140 C56 134 54 128 54 126 Z" />
            <path d="M64 142 C56 146 56 154 64 154 C68 148 66 144 64 142 Z" />
          </g>

          {/* Right Laurel Wreath Leaves (Green) */}
          <g fill="#2B7B38">
            <path d="M170 62 C180 60 188 70 182 76 C174 72 172 64 170 62 Z" />
            <path d="M178 78 C188 78 194 88 186 92 C180 88 178 80 178 78 Z" />
            <path d="M182 96 C192 98 196 108 188 112 C182 106 182 98 182 96 Z" />
            <path d="M182 114 C192 118 194 128 186 132 C180 126 182 116 182 114 Z" />
            <path d="M176 132 C186 138 186 148 178 150 C174 144 176 134 176 132 Z" />

            {/* Inner row leaves */}
            <path d="M160 74 C168 70 172 80 166 84 C160 80 160 76 160 74 Z" />
            <path d="M166 90 C174 88 178 98 172 102 C166 98 166 92 166 90 Z" />
            <path d="M170 108 C178 108 182 118 174 122 C168 116 170 110 170 108 Z" />
            <path d="M166 126 C174 128 176 138 168 140 C164 134 166 128 166 126 Z" />
            <path d="M156 142 C164 146 164 154 156 154 C152 148 154 144 156 142 Z" />
          </g>

          {/* Torch with Flame (Center) */}
          <g transform="translate(110, 120)">
            {/* Flame (Layered Gradient / Colors) */}
            {/* Outer flame (Orange) */}
            <path d="M0 -42 C12 -30 18 -18 18 -6 C18 10 8 16 0 16 C-8 16 -18 10 -18 -6 C-18 -18 -12 -30 0 -42 Z" fill="#EF6C00" />
            {/* Inner flame (Yellow/Golden) */}
            <path d="M0 -32 C8 -22 12 -12 12 -2 C12 8 5 12 0 12 C-5 12 -12 8 -12 -2 C-12 -12 -8 -22 0 -32 Z" fill="#FFB300" />
            {/* Flame core brightness */}
            <path d="M0 -22 C4 -15 6 -8 6 -1 C6 5 3 8 0 8 C-3 8 -6 5 -6 -1 C-6 -8 -4 -15 0 -22 Z" fill="#FFF176" />

            {/* Torch Stand & Cup (Navy Blue) */}
            <path d="M-18 14 L18 14 L12 28 L-12 28 Z" fill="#0B387A" />
            <rect x="-16" y="10" width="32" height="4" fill="#0B387A" rx="1" />
            {/* Torch handle */}
            <path d="M-6 28 L6 28 L3 68 L-3 68 Z" fill="#0B387A" />
            <path d="M-10 68 L10 68 L0 80 Z" fill="#0B387A" />
          </g>

          {/* Open Book Base at Bottom */}
          <g transform="translate(110, 185)">
            {/* Left page */}
            <path d="M0 -10 Q-50 -25 -105 -5 L-100 12 Q-50 -5 0 8 Z" fill="#0B387A" />
            <path d="M0 -6 Q-48 -20 -98 -2 L-95 8 Q-48 -8 0 4 Z" fill="#FFFFFF" />
            <path d="M0 -2 Q-46 -15 -92 1 L-90 5 Q-46 -4 0 2 Z" fill="#0B387A" />

            {/* Right page */}
            <path d="M0 -10 Q50 -25 105 -5 L100 12 Q50 -5 0 8 Z" fill="#0B387A" />
            <path d="M0 -6 Q48 -20 98 -2 L95 8 Q48 -8 0 4 Z" fill="#FFFFFF" />
            <path d="M0 -2 Q46 -15 92 1 L90 5 Q46 -4 0 2 Z" fill="#0B387A" />

            {/* Center Spine Book Fold */}
            <path d="M-2 8 L0 -12 L2 8 Z" fill="#0B387A" />
          </g>
        </g>

        {/* ==================== RIGHT TEXT ==================== */}
        <g transform="translate(235, 0)">
          {/* Top Line: KERALA */}
          <text
            x="0"
            y="90"
            fill="#0B387A"
            fontFamily="'Arial Black', 'Helvetica Neue', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="78"
            letterSpacing="2"
          >
            KERALA
          </text>

          {/* Top Divider Line under KERALA */}
          <line x1="0" y1="106" x2="520" y2="106" stroke="#0B387A" strokeWidth="2.5" />

          {/* Middle Line: BOARD OF HIGHER SECONDARY EXAMINATION */}
          <text
            x="0"
            y="142"
            fill="#126B2E"
            fontFamily="'Arial Black', 'Arial', 'Helvetica Neue', sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="0.8"
          >
            BOARD OF HIGHER SECONDARY EXAMINATION
          </text>

          {/* Bottom Divider Line under BOARD OF HIGHER... */}
          <line x1="0" y1="156" x2="520" y2="156" stroke="#0B387A" strokeWidth="2.5" />

          {/* Bottom Line: LEARN • GROW • SUCCEED with Side Lines */}
          <g transform="translate(0, 192)">
            {/* Left rule */}
            <line x1="0" y1="-7" x2="80" y2="-7" stroke="#0B387A" strokeWidth="2.5" />

            {/* Subtitle Text */}
            <text
              x="92"
              y="-1"
              fill="#0B387A"
              fontFamily="Arial, 'Helvetica Neue', sans-serif"
              fontWeight="800"
              fontSize="20"
              letterSpacing="2"
            >
              LEARN • GROW • SUCCEED
            </text>

            {/* Right rule */}
            <line x1="440" y1="-7" x2="520" y2="-7" stroke="#0B387A" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};
