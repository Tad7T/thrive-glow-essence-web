import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Shield, CircleDashed, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';
import { Skeleton } from '@/components/ui/skeleton';

const BenefitsSection = () => {
  const { contentItems, isLoading } = useAdmin();
  const benefitItems = contentItems.filter(item => item.type === 'benefit');
  
  // Updated benefits based on the new passage
  const defaultBenefits = [
    {
      id: 'default-1',
      title: 'Infused with Natural Ingredients',
      description: 'Infused with Rosemary, Mint, and Biotin to invigorate the hair and scalp, encouraging healthier, stronger, and longer hair while providing shine and smoothing split ends.',
      icon: <Leaf className="w-10 h-10 text-thrive-olive" />
    },
    {
      id: 'default-2',
      title: 'Promotes Hair Growth',
      description: 'Stimulates hair follicles, potentially promoting hair growth and can reduce an itchy scalp and dandruff.',
      icon: <CircleDashed className="w-10 h-10 text-thrive-olive" />
    },
    {
      id: 'default-3',
      title: 'No Harmful Chemicals',
      description: 'Free from parabens, sulfates, and other harmful chemicals, ensuring safe use with no animal testing.',
      icon: <Shield className="w-10 h-10 text-thrive-olive" />
    }
  ];

  // Display admin benefits if available, otherwise show defaults
  const displayBenefits = benefitItems.length > 0 ? benefitItems : defaultBenefits;
  
  return (
    <section id="benefits" className="bg-white relative">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Benefits
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the amazing benefits of our hair essence oil, crafted to help you achieve healthier, stronger, and more beautiful hair.
          </p>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {isLoading ? (
            // Skeleton loaders when loading
            Array(3).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border-none shadow-lg">
                <CardHeader className="pb-2">
                  <Skeleton className="w-16 h-16 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6" />
                </CardContent>
              </Card>
            ))
          ) : (
            displayBenefits.map((benefit, index) => (
              <RevealOnScroll key={benefit.id} delay={index * 100}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden hover:scale-105 transform transition-transform duration-300">
                  <CardHeader className="pb-2">
                    <div className="mb-4">
                      {benefit.imageUrl ? (
                        <img 
                          src={benefit.imageUrl} 
                          alt={benefit.title} 
                          className="w-16 h-16 object-cover rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        benefit.icon || <Leaf className="w-10 h-10 text-thrive-olive" />
                      )}
                    </div>
                    <CardTitle className="text-xl font-semibold text-thrive-brown">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;