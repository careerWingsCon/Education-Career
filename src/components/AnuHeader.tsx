import React from 'react';
import { KeralaBoardLogo } from './KeralaBoardLogo';

export const AnuHeader: React.FC = () => {
  return (
    <header className="w-full bg-[#1c5dcd] bg-gradient-to-r from-[#1e61d5] via-[#1652b5] to-[#114197] text-white select-none shadow-md print:shadow-none print:border-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
        <KeralaBoardLogo size="responsive" variant="full" />
      </div>
    </header>
  );
};

