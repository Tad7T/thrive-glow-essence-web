
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import IngredientsSection from '@/components/IngredientsSection';
import HowToUseSection from '@/components/HowToUseSection';
import BenefitsSection from '@/components/BenefitsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ProductShowcase from '@/components/ProductShowcase';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import LeafDecorations from '@/components/LeafDecorations';
import FloatingButton from '@/components/FloatingButton';
import HiddenAdminButton from '@/components/HiddenAdminButton';
import { AnimatedCursor } from '@/components/AnimatedCursor';

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleRevealElements = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const speed = element.getAttribute('data-speed') || '0.5';
        const speedValue = parseFloat(speed);
        
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${scrollPosition * speedValue}px)`;
        }
      });
    };
    
    const handleScroll = () => {
      handleRevealElements();
      handleParallax();
      
      // Add smooth fade to navigation on scroll
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md');
          navbar.classList.remove('bg-transparent');
        } else {
          navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md');
          navbar.classList.add('bg-transparent');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animations on load
    handleRevealElements();
    
    // Add animated classes to elements with .slide-in class
    const slideElements = document.querySelectorAll('.slide-in');
    slideElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, 200 * index);
    });
    
    // Apply smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="scroll-smooth overflow-x-hidden">
      {/* <AnimatedCursor /> */}
      <LeafDecorations />
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <IngredientsSection />
      <HowToUseSection />
      <BenefitsSection />
      <WhyChooseUsSection />
      <CtaSection />
      <Footer />
      <FloatingButton />
      <HiddenAdminButton />
    </div>
  );
};

export default Index;
