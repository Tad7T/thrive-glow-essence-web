
import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useAdmin } from '@/contexts/AdminContext';
import { Skeleton } from '@/components/ui/skeleton';

const HeroSection = () => {
  const { contentItems, isLoading } = useAdmin();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Filter product images for the carousel
  const productImages = contentItems
    .filter(item => item.type === 'product' && item.imageUrl)
    .map(item => item.imageUrl);
    
  // Fallback images if no products are added yet
  const fallbackImages = [
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=982&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    '/lovable-uploads/fb067b85-75b4-422d-98d5-27ebc43210d0.png'
  ];
  
  const images = productImages.length > 0 ? productImages : fallbackImages;
  
  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1 || isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, [images.length, isLoading]);

  if (isLoading) {
    return (
      <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
        <div className="section-container relative z-10 flex flex-col items-center justify-center">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-12 w-64 md:w-96 mb-4" />
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Full-width background image carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
      </div>
      
      <div className="section-container flex flex-col items-center justify-center relative z-10 min-h-screen">
        <RevealOnScroll>
          <div className="text-center mb-4 animate-fade-in">
            <h4 className="text-lg md:text-xl text-white mb-2">100% Original</h4>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={400}>
          <div className="text-center my-8 animate-fade-in backdrop-blur-sm bg-white/30 px-6 py-4 rounded-lg">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative overflow-hidden">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-thrive-yellow animate-slide-in-right inline-block">
                HAIR ESSENCE OIL
              </span>
            </h2>
          </div>
        </RevealOnScroll>
      </div>
      
      {/* Image navigation dots */}
      {images.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-gray-300/50 hover:bg-gray-400/70'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
