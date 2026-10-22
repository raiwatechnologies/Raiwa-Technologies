import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import { getWhatsAppUrl } from '@/lib/brand.js';

const WhatsAppMark = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
    <path d="M16.02 3.2C9.02 3.2 3.33 8.85 3.33 15.8c0 2.22.59 4.39 1.72 6.31L3.2 28.8l6.87-1.8a12.8 12.8 0 0 0 5.95 1.47h.01c6.99 0 12.68-5.65 12.68-12.61 0-3.37-1.32-6.54-3.72-8.93A12.6 12.6 0 0 0 16.02 3.2Zm0 22.99h-.01c-1.84 0-3.65-.49-5.23-1.41l-.38-.22-4.08 1.07 1.09-3.97-.25-.41a10.5 10.5 0 0 1-1.61-5.45c0-5.79 4.73-10.5 10.55-10.5 2.82 0 5.47 1.1 7.46 3.08a10.42 10.42 0 0 1 3.09 7.43c0 5.79-4.73 10.5-10.63 10.5Zm5.79-7.86c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.36.24-.68.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.57-1.86-1.75-2.18-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.25-.61-.51-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61 0 1.54 1.13 3.02 1.29 3.23.16.21 2.22 3.37 5.37 4.72.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.88-.76 2.15-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z"/>
  </svg>
);

const WhatsAppButton = ({ variant = 'floating', className, text = 'Chat on WhatsApp' }) => {
  const url = getWhatsAppUrl();

  if (variant === 'floating') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={cn(
        'fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full p-4 shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-300',
        className
      )} aria-label="Chat with us on WhatsApp">
        <WhatsAppMark className="w-7 h-7" />
      </a>
    );
  }

  return (
    <Button asChild className={cn('bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold transition-all duration-300 shadow-md', className)}>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
        <WhatsAppMark className="w-5 h-5 mr-2" />{text}
      </a>
    </Button>
  );
};

export default WhatsAppButton;
