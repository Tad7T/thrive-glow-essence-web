import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/#hero' },
    { name: 'Ingredients', href: '/#ingredients' },
    { name: 'How to Use', href: '/#how-to-use' },
    { name: 'Benefits', href: '/#benefits' },
    { name: 'Why Us', href: '/#why-us' },
  ];

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-gray-100'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
                <span className="text-2xl font-bold text-[#14532d] tracking-tight group-hover:text-thrive-olive transition-colors duration-300">
                  THRIVE NATURALS
                </span>
            </Link>
            {/* <div className="hidden md:flex items-center ml-6">
              <div className="flex flex-col h-8 w-12 mr-3 rounded overflow-hidden shadow-md border border-gray-200">
                <div className="h-1/5 w-full bg-[#EF4135]"></div>
                <div className="h-1/5 w-full bg-white"></div>
                <div className="h-2/5 w-full bg-[#2D2A4A]"></div>
                <div className="h-1/5 w-full bg-white"></div>
                <div className="h-1/5 w-full bg-[#EF4135]"></div> 
              </div>
              <span className="text-green-700 font-medium text-sm uppercase tracking-wider">
                Made in Thailand
              </span>
            </div> */}
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-thrive-olive font-medium transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-thrive-olive transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Link
                to="/contact"
                className="ml-4 bg-gradient-to-r from-thrive-olive to-thrive-olive-light text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-thrive-brown hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={28} className="text-thrive-olive" />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden fixed top-20 left-0 right-0 bg-white transition-all duration-500 ease-in-out overflow-hidden shadow-xl',
            isOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 opacity-0'
          )}
          style={{ height: isOpen ? 'calc(100vh - 5rem)' : '0' }}
        >
          <div className="px-6 pt-2 pb-8 space-y-6">
            <div className="py-2 flex items-center justify-center">
              <div className="flex h-6 w-10 mr-3 rounded overflow-hidden shadow-md border border-gray-200">
                <div className="h-1/5 w-full bg-[#EF4135]"></div>
                <div className="h-1/5 w-full bg-white"></div>
                <div className="h-2/5 w-full bg-[#2D2A4A]"></div>
                <div className="h-1/5 w-full bg-white"></div>
                <div className="h-1/5 w-full bg-[#EF4135]"></div>
              </div>
              <span className="font-medium text-gray-700">Made in Thailand</span>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-4 px-4 text-lg text-gray-700 hover:text-thrive-olive hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <div className="pt-4">
              <Link
                to="/contact"
                className="block w-full py-3 bg-gradient-to-r from-thrive-olive to-thrive-olive-light text-white px-6 rounded-full hover:shadow-lg text-center text-lg font-medium transition-all"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;