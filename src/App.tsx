
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminProvider } from "./contexts/AdminContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Initialize CSS variables for color scheme and load content on first load
  useEffect(() => {
    // Load color scheme
    const savedColors = localStorage.getItem('adminColorScheme');
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors);
        // Set CSS custom properties
        document.documentElement.style.setProperty('--color-primary', colors.primary);
        document.documentElement.style.setProperty('--color-secondary', colors.secondary);
        document.documentElement.style.setProperty('--color-accent', colors.accent);
        
        // Update Tailwind thrive-prefixed colors
        document.documentElement.style.setProperty('--thrive-yellow', colors.primary);
        document.documentElement.style.setProperty('--thrive-brown', colors.secondary);
        document.documentElement.style.setProperty('--thrive-olive', colors.accent);
        
        // Add derived color variants
        document.documentElement.style.setProperty('--thrive-yellow-light', adjustColorLightness(colors.primary, 30));
        document.documentElement.style.setProperty('--thrive-olive-light', adjustColorLightness(colors.accent, 30));
      } catch (error) {
        console.error("Error parsing color scheme:", error);
        setDefaultColors();
      }
    } else {
      setDefaultColors();
    }
  }, []);
  
  const setDefaultColors = () => {
    // Set default colors
    document.documentElement.style.setProperty('--color-primary', '#FEF751');
    document.documentElement.style.setProperty('--color-secondary', '#7D5A47');
    document.documentElement.style.setProperty('--color-accent', '#8A8B39');
    
    // Set Tailwind thrive-prefixed colors
    document.documentElement.style.setProperty('--thrive-yellow', '#FEF751');
    document.documentElement.style.setProperty('--thrive-yellow-light', '#FFF9A8');
    document.documentElement.style.setProperty('--thrive-brown', '#7D5A47');
    document.documentElement.style.setProperty('--thrive-olive', '#8A8B39');
    document.documentElement.style.setProperty('--thrive-olive-light', '#A5A654');
  };
  
  // Helper function to adjust color lightness
  const adjustColorLightness = (hex: string, percent: number) => {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    
    // Adjust lightness (making it lighter)
    r = Math.min(255, r + Math.round((255 - r) * percent / 100));
    g = Math.min(255, g + Math.round((255 - g) * percent / 100));
    b = Math.min(255, b + Math.round((255 - b) * percent / 100));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
