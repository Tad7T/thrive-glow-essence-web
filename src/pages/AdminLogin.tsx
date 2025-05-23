
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(password);
      setIsLoading(false);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate('/admin-dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000); // Simulate network request
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-thrive-yellow-light to-thrive-olive-light/20 p-4">
      <div className="max-w-md w-full">
        <Card className="w-full border-thrive-brown/20 bg-white/90 backdrop-blur-sm animate-fade-in shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-thrive-brown">Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pr-10 border-thrive-brown/20 focus-visible:ring-thrive-olive"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-thrive-olive hover:bg-thrive-olive-light text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock size={16} />
                    <span>Login</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              This is a secure area. Unauthorized access is prohibited.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
