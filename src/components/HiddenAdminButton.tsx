
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';

const HiddenAdminButton = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  
  const toggleButtonVisibility = () => {
    setShowButton(!showButton);
  };
  
  const handleClick = () => {
    navigate('/admin-login');
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={toggleButtonVisibility}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        aria-label={showButton ? "Hide admin button" : "Show admin button"}
      >
        {showButton ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      
      {showButton && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClick}
          className="bg-white border-thrive-brown/20 text-thrive-brown hover:bg-thrive-brown hover:text-white animate-fade-in text-xs"
        >
          Admin Login
        </Button>
      )}
    </div>
  );
};

export default HiddenAdminButton;
