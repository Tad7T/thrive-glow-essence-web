import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';
import { Skeleton } from '@/components/ui/skeleton';

const IngredientsSection = () => {
  const { contentItems, isLoading } = useAdmin();
  const ingredientItems = contentItems.filter(item => item.type === 'ingredient');
  
  // Updated fallback ingredients based on the new passage
  const defaultIngredients = [
    {
      id: 'default-1',
      title: 'Castor Oil',
      description: 'Rich in nutrients, castor oil nourishes and strengthens hair, promoting growth.',
      imageUrl: '/fallbackImages/castor_oil.png'
    },
    {
      id: 'default-2',
      title: 'Rosemary Oil',
      description: 'Stimulates hair follicles and improves circulation, potentially enhancing hair growth.',
      imageUrl: '/fallbackImages/rosemary_oil.png'
    },
    {
      id: 'default-3',
      title: 'Coconut Oil',
      description: 'Known for its moisturizing properties, coconut oil helps prevent protein loss and keeps hair strong.',
      imageUrl: '/fallbackImages/coconut_oil.png'
    },
  ];

  // Display admin ingredients if available, otherwise show defaults
  const displayIngredients = ingredientItems.length > 0 ? ingredientItems : defaultIngredients;
  
  return (
    <section id="ingredients" className="bg-thrive-yellow/10 relative">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Key Ingredients
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our hair oil is crafted with the finest natural ingredients, carefully selected for their hair-nourishing properties.
          </p>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {isLoading ? (
            // Skeleton loaders when loading
            Array(3).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border-none shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <CardHeader className="pb-2">
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
            displayIngredients.map((ingredient, index) => (
              <RevealOnScroll key={ingredient.id} delay={index * 100}>
                <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white hover:scale-105 transform transition-transform duration-300">
                  <div className="relative h-48 overflow-hidden bg-thrive-yellow/20">
                    {ingredient.imageUrl ? (
                      <img 
                        src={ingredient.imageUrl} 
                        alt={ingredient.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.png';
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Sparkles className="w-12 h-12 text-thrive-olive" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-thrive-brown">
                      {ingredient.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {ingredient.description}
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

export default IngredientsSection;