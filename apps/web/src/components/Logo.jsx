import React, { useState } from 'react';
import { BRAND } from '@/lib/brand.js';
import { cn } from '@/lib/utils.js';

// Shows the company logo image. If the image file is missing for any reason,
// it falls back to a purple "R" badge so the layout never breaks.
const Logo = ({ className, imgClassName }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          'w-10 h-10 rounded-xl bg-luxury-gradient flex items-center justify-center text-white font-bold text-xl shadow-luxury',
          className
        )}
      >
        R
      </div>
    );
  }

  return (
    <img
      src={BRAND.logoSrc}
      alt={`${BRAND.name} logo`}
      onError={() => setFailed(true)}
      className={cn('w-10 h-10 rounded-xl object-contain', className, imgClassName)}
    />
  );
};

export default Logo;
