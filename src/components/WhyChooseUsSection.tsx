import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { CheckCircle, Star, Leaf, Award, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';
import { Skeleton } from '@/components/ui/skeleton';

const WhyChooseUsSection = () => {
  const { contentItems, isLoading } = useAdmin();
  const testimonialItems = contentItems.filter(item => item.type === 'testimonial');
  
  // Fallback testimonials
  const defaultTestimonials = [
    {
      id: 'default-1',
      title: 'Hanna Temesgen',
      description: "After just 3 weeks of use, my hair has transformed! The natural shine and reduced breakage is incredible. This oil truly delivers on its promises.",
      imageUrl: '',
      role: 'Regular user for 6 months'
    },
    {
      id: 'default-2',
      title: 'Samuel Belay',
      description: "As someone with sensitive scalp, I'm amazed at how soothing this oil is. No irritation, just healthy hair growth and perfect moisture balance.",
      imageUrl: '',
      role: 'Haircare Enthusiast'
    },
    {
      id: 'default-3',
      title: 'Selam Tesfay',
      description: "The results speak for themselves - thicker, longer hair in just two months. I've tried countless products but none compare to this natural formula.",
      imageUrl: '',
      role: 'Verified Customer'
    }
  ];

  const displayTestimonials = testimonialItems.length > 0 ? testimonialItems : defaultTestimonials;
  
  const features = [
    {
      icon: <Leaf className="w-5 h-5 text-thrive-olive" />,
      title: '100% Natural Ingredients',
      description: 'Harnessing nature\'s power with ethically-sourced botanicals from Thailand for maximum hair vitality',
    },
    {
      icon: <Award className="w-5 h-5 text-thrive-olive" />,
      title: 'Proven Results',
      description: 'Clinically tested formula showing 94% improvement in hair strength and shine after 30 days',
    },
    {
      icon: <Heart className="w-5 h-5 text-thrive-olive" />,
      title: 'Loved By Customers',
      description: 'Over 10,000+ satisfied users across Africa experiencing transformative hair growth',
    },
    {
      icon: <Shield className="w-5 h-5 text-thrive-olive" />,
      title: 'Safe & Gentle',
      description: 'Free from harsh chemicals, parabens, and synthetic additives - pure nourishment for your hair',
    },
  ];
  
  return (
    <section id="why-us" className="bg-gradient-to-b from-white to-thrive-yellow-light/10 py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-thrive-olive/10 text-thrive-olive rounded-full text-sm font-medium mb-4">
              The Thrive Difference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-thrive-brown mb-4">
              Why Our Community Chooses Thrive
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the power of nature with our premium hair oil, specially formulated for African hair types
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            // <RevealOnScroll key={index} delay={index * 100}>
            //   <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-thrive-olive/10">
            //     <div className="w-12 h-12 mb-4 flex items-center justify-center bg-thrive-olive/10 rounded-full">
            //       {feature.icon}
            //     </div>
            //     <h3 className="text-xl font-bold text-thrive-brown mb-3">{feature.title}</h3>
            //     <p className="text-gray-600">{feature.description}</p>
            //   </div>
            // </RevealOnScroll>
              <RevealOnScroll key={index} delay={index * 100}>
                <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-green-500 text-white hover:scale-105 transform transition-transform duration-300">
                    <div className="w-12 h-12 mb-4 flex items-center justify-center bg-green-500 rounded-full">
                    {React.cloneElement(feature.icon as React.ReactElement, { className: "w-5 h-5 text-black" })}
                    </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-black">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-black">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </RevealOnScroll>
          ))}
        </div>
        
        <RevealOnScroll delay={400}>
          <div className="text-center mb-12 mt-16">
            <h3 className="text-3xl font-bold text-white-brown mb-2">
              Real Stories, Real Results
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our thriving community
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border-none shadow-md">
                <CardHeader className="pb-2 flex flex-col items-center">
                  <Skeleton className="w-16 h-16 rounded-full mb-4" />
                  <div className="flex mb-2 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-4 h-4 rounded-full" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-full mb-2 mx-auto" />
                  <Skeleton className="h-4 w-5/6 mb-2 mx-auto" />
                  <Skeleton className="h-4 w-4/6 mx-auto" />
                </CardContent>
                <CardFooter className="pt-2 flex flex-col items-center">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))
          ) : (
            displayTestimonials.map((testimonial, index) => (
              <RevealOnScroll key={testimonial.id} delay={index * 150}>
                <div className="bg-green-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full flex flex-col">
                  <div className="flex justify-center mb-4">
                    {testimonial.imageUrl ? (
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.title}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg'; 
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-thrive-yellow/20 flex items-center justify-center">
                        <Star className="w-6 h-6 text-black" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray italic mb-6 flex-grow">
                    "{testimonial.description}"
                  </blockquote>
                  <div className="text-center text-black mt-auto">
                    <p className="font-bold text-gray">{testimonial.title}</p>
                    {testimonial.role && (
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;