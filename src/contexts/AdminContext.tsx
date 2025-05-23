
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Define types for our context
type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
};

type ContentItem = {
  id: string;
  title: string;
  description: string;
  imageFile?: File | null;
  imageUrl: string;
  type: 'benefit' | 'ingredient' | 'testimonial' | 'product';
};

type AdminContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  colorScheme: ColorScheme;
  updateColorScheme: (colors: Partial<ColorScheme>) => void;
  contentItems: ContentItem[];
  addContentItem: (item: Omit<ContentItem, 'id'>) => Promise<void>;
  updateContentItem: (id: string, item: Partial<Omit<ContentItem, 'id'>>) => Promise<void>;
  deleteContentItem: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  isLoading: boolean;
};

// Default values
const defaultColorScheme: ColorScheme = {
  primary: '#FEF751', // Yellow
  secondary: '#7D5A47', // Brown
  accent: '#8A8B39', // Olive
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('adminColorScheme');
    return saved ? JSON.parse(saved) : defaultColorScheme;
  });
  
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Apply color scheme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', colorScheme.primary);
    document.documentElement.style.setProperty('--color-secondary', colorScheme.secondary);
    document.documentElement.style.setProperty('--color-accent', colorScheme.accent);
  }, [colorScheme]);

  // Persist color scheme to localStorage
  useEffect(() => {
    localStorage.setItem('adminColorScheme', JSON.stringify(colorScheme));
  }, [colorScheme]);

  // Fetch content from Supabase on load
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // Fetch products
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*, product_images(*)');
        
        if (productsError) throw productsError;

        // Fetch benefits
        const { data: benefits, error: benefitsError } = await supabase
          .from('benefits')
          .select('*');
        
        if (benefitsError) throw benefitsError;

        // Fetch ingredients
        const { data: ingredients, error: ingredientsError } = await supabase
          .from('ingredients')
          .select('*');
        
        if (ingredientsError) throw ingredientsError;

        // Fetch testimonials
        const { data: testimonials, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*');
        
        if (testimonialsError) throw testimonialsError;

        // Map data to ContentItem format
        const mappedProducts = products.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description || '',
          imageUrl: product.product_images?.[0]?.image_url || '',
          type: 'product' as const
        }));

        const mappedBenefits = benefits.map(benefit => ({
          id: benefit.id,
          title: benefit.title,
          description: benefit.description || '',
          imageUrl: benefit.image_url || '',
          type: 'benefit' as const
        }));

        const mappedIngredients = ingredients.map(ingredient => ({
          id: ingredient.id,
          title: ingredient.title,
          description: ingredient.description || '',
          imageUrl: ingredient.image_url || '',
          type: 'ingredient' as const
        }));

        const mappedTestimonials = testimonials.map(testimonial => ({
          id: testimonial.id,
          title: testimonial.title,
          description: testimonial.description || '',
          imageUrl: testimonial.image_url || '',
          type: 'testimonial' as const
        }));

        // Combine all content
        const allContent = [
          ...mappedProducts,
          ...mappedBenefits,
          ...mappedIngredients,
          ...mappedTestimonials
        ];

        setContentItems(allContent);
      } catch (error) {
        console.error('Error fetching content:', error);
        toast({
          title: "Error",
          description: "Failed to load content from the database",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [toast]);

  // Check authentication on load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple password authentication
  const login = (password: string) => {
    // This is just for demo purposes - in a real app, use a secure authentication method
    if (password === 'thriveadmin2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  const updateColorScheme = (colors: Partial<ColorScheme>) => {
    setColorScheme(prev => {
      const newColorScheme = { ...prev, ...colors };
      return newColorScheme;
    });
  };

  // Function to handle image uploads to Supabase storage
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('thrive_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the uploaded image
      const { data: urlData } = supabase.storage
        .from('thrive_images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Fallback to data URL for testing if upload fails
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Add content item to Supabase
  const addContentItem = async (item: Omit<ContentItem, 'id'>) => {
    setIsLoading(true);
    try {
      let imageUrl = item.imageUrl;
      
      if (item.imageFile) {
        imageUrl = await uploadImage(item.imageFile);
      }
      
      let newItemId = '';
      
      // Insert to appropriate table based on type
      switch (item.type) {
        case 'product':
          const { data: product, error: productError } = await supabase
            .from('products')
            .insert({ title: item.title, description: item.description })
            .select('id')
            .single();
          
          if (productError) throw productError;
          
          newItemId = product.id;
          
          // Add product image if available
          if (imageUrl) {
            const { error: imageError } = await supabase
              .from('product_images')
              .insert({ 
                product_id: newItemId, 
                image_url: imageUrl,
                is_primary: true
              });
            
            if (imageError) throw imageError;
          }
          break;
          
        case 'benefit':
          const { data: benefit, error: benefitError } = await supabase
            .from('benefits')
            .insert({ 
              title: item.title, 
              description: item.description,
              image_url: imageUrl 
            })
            .select('id')
            .single();
          
          if (benefitError) throw benefitError;
          newItemId = benefit.id;
          break;
          
        case 'ingredient':
          const { data: ingredient, error: ingredientError } = await supabase
            .from('ingredients')
            .insert({ 
              title: item.title, 
              description: item.description,
              image_url: imageUrl 
            })
            .select('id')
            .single();
          
          if (ingredientError) throw ingredientError;
          newItemId = ingredient.id;
          break;
          
        case 'testimonial':
          const { data: testimonial, error: testimonialError } = await supabase
            .from('testimonials')
            .insert({ 
              title: item.title, 
              description: item.description,
              image_url: imageUrl 
            })
            .select('id')
            .single();
          
          if (testimonialError) throw testimonialError;
          newItemId = testimonial.id;
          break;
      }
      
      // Update local state
      const newItem = {
        ...item,
        imageUrl,
        id: newItemId
      };
      
      setContentItems(prev => [...prev, newItem]);
      
      toast({
        title: "Success",
        description: `${item.type} added successfully`,
      });
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: `Failed to add ${item.type}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update content item in Supabase
  const updateContentItem = async (id: string, item: Partial<Omit<ContentItem, 'id'>>) => {
    setIsLoading(true);
    try {
      let updates = { ...item };
      let imageUrl = item.imageUrl;
      
      // Upload new image if provided
      if (item.imageFile) {
        imageUrl = await uploadImage(item.imageFile);
        updates = { ...updates, imageUrl };
      }
      
      // Find the item to update
      const currentItem = contentItems.find(content => content.id === id);
      if (!currentItem) throw new Error('Item not found');
      
      // Update in appropriate table based on type
      switch (currentItem.type) {
        case 'product':
          const { error: productError } = await supabase
            .from('products')
            .update({ 
              title: updates.title, 
              description: updates.description,
              updated_at: new Date().toISOString()
            })
            .eq('id', id);
          
          if (productError) throw productError;
          
          // Update product image if new image provided
          if (imageUrl && imageUrl !== currentItem.imageUrl) {
            // Check if product already has images
            const { data: existingImages } = await supabase
              .from('product_images')
              .select('id')
              .eq('product_id', id);
            
            if (existingImages && existingImages.length > 0) {
              // Update existing primary image
              const { error: imageUpdateError } = await supabase
                .from('product_images')
                .update({ image_url: imageUrl })
                .eq('product_id', id)
                .eq('is_primary', true);
              
              if (imageUpdateError) throw imageUpdateError;
            } else {
              // Insert new image
              const { error: imageInsertError } = await supabase
                .from('product_images')
                .insert({ 
                  product_id: id, 
                  image_url: imageUrl,
                  is_primary: true
                });
              
              if (imageInsertError) throw imageInsertError;
            }
          }
          break;
          
        case 'benefit':
          const { error: benefitError } = await supabase
            .from('benefits')
            .update({ 
              title: updates.title, 
              description: updates.description,
              image_url: imageUrl || currentItem.imageUrl
            })
            .eq('id', id);
          
          if (benefitError) throw benefitError;
          break;
          
        case 'ingredient':
          const { error: ingredientError } = await supabase
            .from('ingredients')
            .update({ 
              title: updates.title, 
              description: updates.description,
              image_url: imageUrl || currentItem.imageUrl
            })
            .eq('id', id);
          
          if (ingredientError) throw ingredientError;
          break;
          
        case 'testimonial':
          const { error: testimonialError } = await supabase
            .from('testimonials')
            .update({ 
              title: updates.title, 
              description: updates.description,
              image_url: imageUrl || currentItem.imageUrl
            })
            .eq('id', id);
          
          if (testimonialError) throw testimonialError;
          break;
      }
      
      // Update local state
      setContentItems(prev => 
        prev.map(contentItem => 
          contentItem.id === id 
            ? { 
                ...contentItem, 
                ...updates, 
                imageUrl: imageUrl || contentItem.imageUrl 
              } 
            : contentItem
        )
      );
      
      toast({
        title: "Success",
        description: `${currentItem.type} updated successfully`,
      });
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete content item from Supabase
  const deleteContentItem = async (id: string) => {
    setIsLoading(true);
    try {
      // Find the item to delete
      const itemToDelete = contentItems.find(item => item.id === id);
      if (!itemToDelete) throw new Error('Item not found');
      
      // Delete from appropriate table based on type
      switch (itemToDelete.type) {
        case 'product':
          const { error: productError } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
          
          if (productError) throw productError;
          break;
          
        case 'benefit':
          const { error: benefitError } = await supabase
            .from('benefits')
            .delete()
            .eq('id', id);
          
          if (benefitError) throw benefitError;
          break;
          
        case 'ingredient':
          const { error: ingredientError } = await supabase
            .from('ingredients')
            .delete()
            .eq('id', id);
          
          if (ingredientError) throw ingredientError;
          break;
          
        case 'testimonial':
          const { error: testimonialError } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);
          
          if (testimonialError) throw testimonialError;
          break;
      }
      
      // Update local state
      setContentItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Success",
        description: `${itemToDelete.type} deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    colorScheme,
    updateColorScheme,
    contentItems,
    addContentItem,
    updateContentItem,
    deleteContentItem,
    uploadImage,
    isLoading
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
