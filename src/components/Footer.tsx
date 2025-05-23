import React from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-thrive-brown text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-5">
              <Leaf className="text-thrive-yellow mr-2" size={24} />
              <h3 className="text-2xl font-bold text-white">THRIVE NATURALS</h3>
            </div>
            <p className="mb-6 text-white/80 text-lg leading-relaxed">
              Premium hair care products crafted with 100% natural ingredients for transformative results.
            </p>
            
            <div className="flex items-center mb-6">
              <div className="flex flex-col h-10 w-16 mr-3 rounded overflow-hidden shadow-lg border border-white/10">
                <div className="h-1/5 w-full bg-[#EF4135]"></div>
                <div className="h-1/5 w-full bg-white"></div>
                <div className="h-2/5 w-full bg-[#2D2A4A]"></div>
                <div className="h-1/5 w-full bg-white"></div>
                <div className="h-1/5 w-full bg-[#EF4135]"></div>
              </div>
              <span className="text-white font-medium text-lg">Proudly Made in Thailand</span>
            </div>
            
            <div className="flex space-x-5">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-thrive-yellow hover:text-thrive-brown transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-thrive-yellow hover:text-thrive-brown transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-thrive-yellow hover:text-thrive-brown transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white pb-2 border-b border-white/20">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="flex items-center text-white/80 hover:text-thrive-yellow transition-colors group">
                  <span className="w-1 h-1 mr-2 bg-thrive-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="#ingredients" className="flex items-center text-white/80 hover:text-thrive-yellow transition-colors group">
                  <span className="w-1 h-1 mr-2 bg-thrive-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Ingredients
                </a>
              </li>
              <li>
                <a href="#how-to-use" className="flex items-center text-white/80 hover:text-thrive-yellow transition-colors group">
                  <span className="w-1 h-1 mr-2 bg-thrive-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  How to Use
                </a>
              </li>
              <li>
                <a href="#benefits" className="flex items-center text-white/80 hover:text-thrive-yellow transition-colors group">
                  <span className="w-1 h-1 mr-2 bg-thrive-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Benefits
                </a>
              </li>
              <li>
                <a href="#why-us" className="flex items-center text-white/80 hover:text-thrive-yellow transition-colors group">
                  <span className="w-1 h-1 mr-2 bg-thrive-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white pb-2 border-b border-white/20">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-white/80 mb-1">Email us at</p>
                  <a href="mailto:hello@thrivenaturals.com" className="text-white hover:text-thrive-yellow transition-colors">hello@thrivenaturals.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-white/80 mb-1">Call us at</p>
                  <a href="tel:+66123456789" className="text-white hover:text-thrive-yellow transition-colors">+66 1 23 45 67 89</a>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-white/60 mb-2">DISTRIBUTED BY</h4>
              <p className="text-white">Thrive Naturals Co., Ltd.</p>
              <p className="text-white/80 text-sm">Bangkok, Thailand</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Thrive Naturals. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;