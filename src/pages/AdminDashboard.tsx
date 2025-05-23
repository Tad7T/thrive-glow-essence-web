
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Settings, Grid3X3, LogOut, ChevronLeft, PlusCircle } from 'lucide-react';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminContent from '@/components/admin/AdminContent';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const menuItems = [
    { path: '/admin-dashboard', label: 'Content', icon: Grid3X3 },
    { path: '/admin-dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className={`${isMobile ? 'hidden' : 'w-64'} bg-white border-r border-border shadow-sm`}>
          <div className="h-full flex flex-col">
            <div className="px-6 py-6 border-b border-border">
              <h1 className="text-xl font-bold text-thrive-brown">Thrive Admin</h1>
            </div>
            
            <nav className="flex-1 px-3 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-thrive-yellow-light text-thrive-brown'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="p-4 border-t border-border">
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-600 hover:text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Mobile Header */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b border-border shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <h1 className="text-lg font-bold text-thrive-brown">Thrive Admin</h1>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-600"
              >
                {menuOpen ? <ChevronLeft className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
              </Button>
            </div>
            
            {/* Mobile Menu */}
            {menuOpen && (
              <div className="bg-white border-b border-border">
                <nav className="px-4 py-2 space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? 'bg-thrive-yellow-light text-thrive-brown'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-gray-600 hover:text-red-500 mt-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </nav>
              </div>
            )}
          </div>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto bg-gray-50 ${isMobile ? 'pt-16' : ''}`}>
          <Routes>
            <Route path="/" element={<AdminContent />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
