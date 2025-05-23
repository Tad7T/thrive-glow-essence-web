import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ShoppingBag, Leaf } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-thrive-olive/95 to-thrive-brown/90 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-10 w-32 h-32 rounded-full bg-thrive-yellow/30 blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-black/10 blur-xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <RevealOnScroll>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-black/10 backdrop-blur-sm rounded-full border border-black/20">
              <Leaf className="w-5 h-5 text-thrive-green" />
              <span className="text-thrive-green font-medium">Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black leading-tight">
              Transform Your Hair <br className="hidden md:block"/> Naturally
            </h2>
            
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-black/90 leading-relaxed">
              Experience the power of nature with our premium hair oil—crafted for strength, shine, and deep nourishment.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-transparent hover:bg-black/10 border-2 border-black text-black hover:text-black px-8 py-6 rounded-full transition-all duration-300 text-lg font-semibold"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            
            {/* <div className="mt-8 flex items-center justify-center gap-2 text-black/80">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm">Free shipping on orders over $50</span>
            </div> */}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default CtaSection;