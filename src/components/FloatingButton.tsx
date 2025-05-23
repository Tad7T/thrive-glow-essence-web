
import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 transition-all duration-300 transform',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      )}
    >
      <button
        className="bg-thrive-olive hover:bg-thrive-olive-light text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Buy Now"
      >
        <ShoppingBag size={24} />
      </button>
    </div>
  );
};

export default FloatingButton;
