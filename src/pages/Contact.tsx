
import React from 'react';
import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import LeafDecorations from '@/components/LeafDecorations';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

const Contact = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F2FCE2]/30">
      <LeafDecorations />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-thrive-brown mb-4">
                Get in <span className="text-thrive-olive">Touch</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about our products? We're here to help you with anything you need.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <RevealOnScroll delay={200}>
              <div className="bg-white rounded-xl shadow-xl p-8 backdrop-blur-sm bg-white/90">
                <h2 className="text-2xl font-bold text-thrive-brown mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-thrive-brown">Our Location</h3>
                      <p className="text-gray-600 mt-1">
                        Thrive Naturals, Luoyang, Henan, China
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-thrive-brown">Email Us</h3>
                      <p className="text-gray-600 mt-1">
                        hello@thrivenaturals.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-thrive-brown">Call Us</h3>
                      <p className="text-gray-600 mt-1">
                        +1 (800) THRIVE-123
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-thrive-brown">Business Hours</h3>
                      <p className="text-gray-600 mt-1">
                        Monday - Friday: 9am - 5pm <br />
                        Saturday: 10am - 2pm <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-thrive-brown mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive hover:bg-thrive-olive hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href="#" className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive hover:bg-thrive-olive hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" className="bg-thrive-yellow/20 p-3 rounded-full text-thrive-olive hover:bg-thrive-olive hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={400}>
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
