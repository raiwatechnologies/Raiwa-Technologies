import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';
import { getWhatsAppUrl } from '@/lib/brand.js';

const WhatsAppButton = ({ variant = 'floating', className, text = "Chat on WhatsApp" }) => {
  const handleWhatsAppClick = () => {
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  if (variant === 'floating') {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={cn(
          "fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-light text-white rounded-full p-4 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 active:scale-95 group flex items-center justify-center hover:scale-110",
          className
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={cn(
        "bg-primary hover:bg-primary-light text-white font-bold transition-all duration-300 active:scale-[0.98] shadow-luxury hover:shadow-luxury-hover hover:scale-105",
        className
      )}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {text}
    </Button>
  );
};

export default WhatsAppButton;