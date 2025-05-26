import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAdmin } from '@/contexts/AdminContext';
import { ShoppingBag, Leaf } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductShowcase = () => {
  const { contentItems, isLoading } = useAdmin();
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Filter products from contentItems
    const productItems = contentItems.filter(item => item.type === 'product');
    setProducts(productItems);
    
    // Fallback if no products are added yet
    if (productItems.length === 0 && !isLoading) {
      setProducts([
        {
          id: 'default-1',
          title: 'Thrive Facial Oil',
          description: 'Our signature facial oil for radiant skin',
          imageUrl: '/fallbackImages/thrive_1.JPG',
        },
        {
          id: 'default-2',
          title: 'Organic Cream',
          description: 'Deeply moisturizing, 100% organic cream',
          imageUrl: '/fallbackImages/thrive_2.JPG',
        },
        {
          id: 'default-3',
          title: 'Thrive Gift Set',
          description: 'Perfect gift for someone special',
          imageUrl: '/fallbackImages/thrive_3.png',
        },
        {
          id: 'default-4',
          title: 'Hydrating Serum',
          description: 'Intensive hydration for all skin types',
          imageUrl: '/fallbackImages/thrive_1.JPG',
        },
        {
          id: 'default-5',
          title: 'Thrive Body Butter',
          description: 'Rich, nourishing body butter for silky smooth skin',
          imageUrl: '/fallbackImages/thrive_2.JPG',
        }
      ]);
    }
  }, [contentItems, isLoading]);

  const LoadingSkeleton = () => (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16">
        <div className="text-center md:text-left md:max-w-lg">
          <Skeleton className="h-10 w-48 mb-4 mx-auto md:mx-0 rounded-full" />
          <Skeleton className="h-5 w-full md:w-3/4 mb-2 rounded-full" />
          <Skeleton className="h-5 w-5/6 md:w-2/3 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="bg-white border-2 border-thrive-olive/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <Skeleton className="w-full aspect-square rounded-t-xl" />
            <div className="p-5 space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-5 w-16 mt-2 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-thrive-yellow-light/30">
      <div className="max-w-screen-2xl mx-auto px-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-20 gap-8">
              <div className="text-center md:text-left md:max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-thrive-olive/10 rounded-full text-thrive-olive">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-medium">Natural & Organic</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-thrive-brown mb-4 slide-in">
                  Thrive Naturals Collection
                </h2>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl slide-in">
                  Premium Thai-inspired skincare crafted with nature's finest ingredients for radiant, healthy skin
                </p>
              </div>
              
              <div className="mt-6 md:mt-0 flex items-center gap-3 slide-in px-6 py-3 bg-thrive-olive/5 rounded-full border border-thrive-olive/20">
                <ShoppingBag className="w-5 h-5 text-thrive-olive" />
                <span className="text-thrive-brown font-medium">100% Natural Ingredients</span>
              </div>
            </div>

            <div className="w-full overflow-hidden -mx-2">
              <Carousel 
                className="w-full px-2"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <div className="group h-full rounded-2xl overflow-hidden bg-white border-2 border-thrive-olive/10 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5">
                        <div className="aspect-square w-full overflow-hidden relative">
                          <img 
                            src={product.imageUrl} 
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="p-4 text-white text-center w-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                              <span className="inline-block px-4 py-2 bg-thrive-olive rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
                                Discover More
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 space-y-2">
                          <h3 className="font-bold text-xl mb-1 text-thrive-brown group-hover:text-thrive-olive transition-colors duration-300">{product.title}</h3>
                          <p className="text-gray-600">{product.description}</p>
                          <div className="flex justify-between items-center pt-2">
                            <span className="font-bold text-thrive-brown">{product.price}</span>
                            <button className="text-thrive-olive hover:text-thrive-brown transition-colors">
                              <ShoppingBag className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="flex justify-center mt-10 gap-4">
                  <CarouselPrevious className="relative static left-0 right-auto translate-y-0 rounded-full bg-white/90 backdrop-blur-sm border-thrive-olive text-thrive-olive hover:bg-thrive-olive hover:text-white w-12 h-12" />
                  <CarouselNext className="relative static right-0 left-auto translate-y-0 rounded-full bg-white/90 backdrop-blur-sm border-thrive-olive text-thrive-olive hover:bg-thrive-olive hover:text-white w-12 h-12" />
                </div>
              </Carousel>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;