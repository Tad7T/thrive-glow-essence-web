
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paintbrush, RefreshCw, Palette, Eye, CheckCircle2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const AdminSettings = () => {
  const { colorScheme, updateColorScheme } = useAdmin();
  const { toast } = useToast();
  
  const [colors, setColors] = useState({
    primary: colorScheme.primary,
    secondary: colorScheme.secondary,
    accent: colorScheme.accent,
    primaryLight: lightenColor(colorScheme.primary, 30),
    accentLight: lightenColor(colorScheme.accent, 30),
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [currentTab, setCurrentTab] = useState("colors");

  // Update local state when context changes
  useEffect(() => {
    setColors({
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
      accent: colorScheme.accent,
      primaryLight: lightenColor(colorScheme.primary, 30),
      accentLight: lightenColor(colorScheme.accent, 30),
    });
  }, [colorScheme]);

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    if (key === 'primary') {
      setColors(prev => ({ 
        ...prev, 
        [key]: value,
        primaryLight: lightenColor(value, 30)
      }));
    } else if (key === 'accent') {
      setColors(prev => ({ 
        ...prev, 
        [key]: value,
        accentLight: lightenColor(value, 30)
      }));
    } else {
      setColors(prev => ({ ...prev, [key]: value }));
    }
  };

  const saveColorChanges = () => {
    const colorsToSave = {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
    };
    
    updateColorScheme(colorsToSave);
    
    // Apply CSS custom properties directly to the document root element
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    
    // Update the thrive- prefixed colors in Tailwind
    document.documentElement.style.setProperty('--thrive-yellow', colors.primary);
    document.documentElement.style.setProperty('--thrive-brown', colors.secondary);
    document.documentElement.style.setProperty('--thrive-olive', colors.accent);
    
    // Add derived color variants
    document.documentElement.style.setProperty('--thrive-yellow-light', colors.primaryLight);
    document.documentElement.style.setProperty('--thrive-olive-light', colors.accentLight);
    
    toast({
      title: "Colors updated",
      description: "Your color scheme changes have been saved and applied to the entire website.",
      variant: "default",
    });
  };

  const resetToDefault = () => {
    const defaultColors = {
      primary: '#FEF751', // Yellow
      secondary: '#7D5A47', // Brown
      accent: '#8A8B39', // Olive
    };
    
    const defaultWithDerivatives = {
      ...defaultColors,
      primaryLight: lightenColor(defaultColors.primary, 30),
      accentLight: lightenColor(defaultColors.accent, 30),
    };
    
    setColors(defaultWithDerivatives);
    updateColorScheme(defaultColors);
    
    // Reset CSS properties
    document.documentElement.style.setProperty('--color-primary', defaultColors.primary);
    document.documentElement.style.setProperty('--color-secondary', defaultColors.secondary);
    document.documentElement.style.setProperty('--color-accent', defaultColors.accent);
    
    // Reset Tailwind colors
    document.documentElement.style.setProperty('--thrive-yellow', defaultColors.primary);
    document.documentElement.style.setProperty('--thrive-brown', defaultColors.secondary);
    document.documentElement.style.setProperty('--thrive-olive', defaultColors.accent);
    
    // Reset derived colors
    document.documentElement.style.setProperty('--thrive-yellow-light', defaultWithDerivatives.primaryLight);
    document.documentElement.style.setProperty('--thrive-olive-light', defaultWithDerivatives.accentLight);
    
    toast({
      title: "Colors reset",
      description: "Your color scheme has been reset to default values.",
    });
  };

  // Function to lighten a color by a percentage
  function lightenColor(hex: string, percent: number): string {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    
    // Adjust lightness
    r = Math.min(255, r + Math.round((255 - r) * percent / 100));
    g = Math.min(255, g + Math.round((255 - g) * percent / 100));
    b = Math.min(255, b + Math.round((255 - b) * percent / 100));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // Function to darken a color by a percentage
  function darkenColor(hex: string, percent: number): string {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    
    // Adjust darkness
    r = Math.max(0, r - Math.round(r * percent / 100));
    g = Math.max(0, g - Math.round(g * percent / 100));
    b = Math.max(0, b - Math.round(b * percent / 100));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  const predefinedColorSchemes = [
    {
      name: "Default",
      primary: "#FEF751", // Yellow
      secondary: "#7D5A47", // Brown
      accent: "#8A8B39", // Olive
    },
    {
      name: "Ocean",
      primary: "#64B5F6", // Light Blue
      secondary: "#1A2B3C", // Dark Blue
      accent: "#26A69A", // Teal
    },
    {
      name: "Sunset",
      primary: "#FFB74D", // Orange
      secondary: "#5D4037", // Brown
      accent: "#E57373", // Red
    },
    {
      name: "Forest",
      primary: "#AED581", // Light Green
      secondary: "#33691E", // Dark Green
      accent: "#8D6E63", // Brown
    },
    {
      name: "Lavender",
      primary: "#D1C4E9", // Light Purple
      secondary: "#4527A0", // Deep Purple
      accent: "#7986CB", // Indigo
    },
  ];

  const applyColorScheme = (scheme: { primary: string; secondary: string; accent: string }) => {
    const newColors = {
      ...scheme,
      primaryLight: lightenColor(scheme.primary, 30),
      accentLight: lightenColor(scheme.accent, 30),
    };
    
    setColors(newColors);
  };

  const colorOptions = [
    { id: 'primary', label: 'Primary Color', description: 'Main brand color, used for highlights, buttons, and accents' },
    { id: 'secondary', label: 'Secondary Color', description: 'Used for text, headings, and contrasting elements' },
    { id: 'accent', label: 'Accent Color', description: 'Used for interactive elements, buttons, and accents' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-thrive-brown mb-6">Settings</h1>
      
      <Tabs defaultValue="colors" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Paintbrush className="w-4 h-4" />
            <span>Color Scheme</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span>Color Templates</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <div className="flex justify-end mb-4">
            <Button 
              variant={previewMode ? "default" : "outline"} 
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {previewMode ? "Preview Mode: On" : "Preview Mode: Off"}
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Color Settings</CardTitle>
              <CardDescription>
                Customize the color scheme for your entire website. Changes will apply to all pages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {colorOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={option.id} className="text-base font-medium">{option.label}</Label>
                      <div 
                        className="w-10 h-10 rounded-full border border-gray-200 shadow-sm" 
                        style={{ backgroundColor: colors[option.id as keyof typeof colors] }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id={option.id}
                        type="text"
                        value={colors[option.id as keyof typeof colors]}
                        onChange={(e) => handleColorChange(option.id as keyof typeof colors, e.target.value)}
                        className="font-mono"
                      />
                      <Input
                        type="color"
                        value={colors[option.id as keyof typeof colors]}
                        onChange={(e) => handleColorChange(option.id as keyof typeof colors, e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    
                    {/* Color tones slider */}
                    {(option.id === 'primary' || option.id === 'accent') && !previewMode && (
                      <div className="pt-2">
                        <Label htmlFor={`${option.id}-light`} className="text-sm font-medium">Adjust Light Variant</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs">Lighter</span>
                          <Slider
                            id={`${option.id}-light`}
                            defaultValue={[30]}
                            max={70}
                            step={5}
                            onValueChange={(values) => {
                              const key = option.id === 'primary' ? 'primaryLight' : 'accentLight';
                              const newLight = lightenColor(colors[option.id as keyof typeof colors], values[0]);
                              setColors(prev => ({ ...prev, [key]: newLight }));
                            }}
                            className="flex-1"
                          />
                          <span className="text-xs">Darker</span>
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200" 
                            style={{ 
                              backgroundColor: option.id === 'primary' 
                                ? colors.primaryLight 
                                : colors.accentLight 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center gap-4 pt-4">
                  <Button onClick={saveColorChanges} className="bg-thrive-olive hover:bg-thrive-olive-light text-white">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={resetToDefault} className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                
                {/* Preview section */}
                {previewMode && (
                  <div className="mt-8 p-4 rounded-lg bg-muted">
                    <h3 className="font-medium mb-4">Preview</h3>
                    
                    <div className="space-y-6">
                      {/* Color Swatches */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Colors</h4>
                        <div className="flex flex-wrap gap-4">
                          <div 
                            style={{ backgroundColor: colors.primary }} 
                            className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                          >
                            Primary
                          </div>
                          <div 
                            style={{ backgroundColor: colors.primaryLight }} 
                            className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                          >
                            Light
                          </div>
                          <div 
                            style={{ backgroundColor: colors.secondary, color: 'white' }} 
                            className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                          >
                            Secondary
                          </div>
                          <div 
                            style={{ backgroundColor: colors.accent, color: 'white' }} 
                            className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                          >
                            Accent
                          </div>
                          <div 
                            style={{ backgroundColor: colors.accentLight }} 
                            className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                          >
                            Light
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Buttons</h4>
                        <div className="flex flex-wrap gap-4">
                          <Button 
                            style={{ backgroundColor: colors.primary, color: colors.secondary }}
                          >
                            Primary Button
                          </Button>
                          <Button 
                            variant="outline" 
                            style={{ borderColor: colors.secondary, color: colors.secondary }}
                          >
                            Secondary Button
                          </Button>
                          <Button 
                            style={{ backgroundColor: colors.accent, color: 'white' }}
                          >
                            Accent Button
                          </Button>
                        </div>
                      </div>
                      
                      {/* Typography */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Typography</h4>
                        <div className="space-y-2">
                          <h2 style={{ color: colors.secondary }} className="text-2xl font-bold">
                            Heading Example
                          </h2>
                          <p style={{ color: colors.secondary }}>
                            Regular text in secondary color
                          </p>
                          <p>
                            <span style={{ color: colors.accent }} className="font-medium">
                              Accent colored text for emphasis
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Thailand Flag */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Thailand Flag</h4>
                        <div className="flex items-center">
                          <div className="flex flex-col h-8 w-12 mr-3 rounded overflow-hidden shadow-md border border-gray-200">
                            <div className="h-1/5 w-full bg-[#EF4135]"></div> {/* Red */}
                            <div className="h-1/5 w-full bg-white"></div>      {/* White */}
                            <div className="h-2/5 w-full bg-[#2D2A4A]"></div>  {/* Blue (official Thai flag blue) */}
                            <div className="h-1/5 w-full bg-white"></div>      {/* White */}
                            <div className="h-1/5 w-full bg-[#EF4135]"></div>  {/* Red */}
                          </div>
                          <span style={{ color: colors.secondary }} className="font-medium">Made in Thailand</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Color Templates</CardTitle>
              <CardDescription>
                Choose from predefined color schemes for quick customization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predefinedColorSchemes.map((scheme, idx) => (
                  <div 
                    key={`scheme-${idx}`} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => applyColorScheme(scheme)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{scheme.name}</h3>
                      {colors.primary === scheme.primary && 
                       colors.secondary === scheme.secondary && 
                       colors.accent === scheme.accent && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex space-x-2 mb-3">
                      <div 
                        className="w-full h-8 rounded-sm" 
                        style={{ backgroundColor: scheme.primary }}
                      ></div>
                      <div 
                        className="w-full h-8 rounded-sm" 
                        style={{ backgroundColor: scheme.secondary }}
                      ></div>
                      <div 
                        className="w-full h-8 rounded-sm" 
                        style={{ backgroundColor: scheme.accent }}
                      ></div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyColorScheme(scheme);
                        saveColorChanges();
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    saveColorChanges();
                    toast({
                      title: "Template Applied",
                      description: "Your selected color template has been applied to the entire website.",
                    });
                  }}
                  className="bg-thrive-olive hover:bg-thrive-olive-light text-white"
                >
                  Save Current Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
