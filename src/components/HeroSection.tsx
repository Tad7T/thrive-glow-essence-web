import React, { useState, useEffect } from 'react';
import { Leaf, ChevronLeft, ChevronRight, Link } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { useAdmin } from '@/contexts/AdminContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from './ui/button';

const HeroSection = () => {
  const { contentItems, isLoading } = useAdmin();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Filter product images for the carousel
  const productImages = contentItems
    .filter(item => item.type === 'product' && item.imageUrl)
    .map(item => item.imageUrl);
    
  // Fallback images if no products are added yet
  const fallbackImages = [
    // 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=982&q=80',
    // 'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    // 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    // '/lovable-uploads/fb067b85-75b4-422d-98d5-27ebc43210d0.png'
    '/fallbackImages/thrive_1.JPG',
    '/fallbackImages/thrive_2.JPG',
    '/fallbackImages/thrive_3.png',
    // '/lovable-uploads/b49771c0-c998-442e-a1a9-6cabc432cb90.png'

  ];
  
  const images = productImages.length > 0 ? productImages : fallbackImages;
  
  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1 || isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length, isLoading]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return (
      <section id="hero" className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="section-container relative z-10 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-4xl mx-auto">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="mt-8 space-y-4 w-full max-w-2xl mx-auto">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-12 w-64 md:w-96 mx-auto" />
            </div>
          </div>
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
              backgroundAttachment: 'fixed',
            }}
          />
        ))}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
      </div>
      
      <div className="section-container flex flex-col items-center justify-center relative z-10 min-h-screen px-4">
        <RevealOnScroll>
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Leaf className="h-5 w-5 text-thrive-yellow" />
              <h4 className="text-sm md:text-base font-medium text-white uppercase tracking-wider">
                100% Natural & Original
              </h4>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={400}>
          <div className="text-center my-8 animate-fade-in max-w-4xl w-full">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-thrive-yellow to-white animate-text-shimmer">
                HAIR GROWTH OIL
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto backdrop-blur-sm bg-white/10 px-6 py-4 rounded-xl">
              Transform your hair with our premium natural formula for stronger, shinier, healthier locks
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={800}>
          <div className="mt-8 flex gap-4">
                <Button 
                asChild
                className="px-8 py-3 bg-thrive-olive hover:bg-thrive-olive-dark text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                <a href="/contact">Shop Now</a>
                </Button>
            {/* <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full transition-all duration-300 hover:bg-white/10 hover:shadow-lg">
              Learn More
            </button> */}
          </div>
        </RevealOnScroll>
      </div>
      
      {/* Image navigation */}
      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center justify-start z-10 px-4">
            <button 
              onClick={prevImage}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-end z-10 px-4">
            <button 
              onClick={nextImage}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-thrive-yellow scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;