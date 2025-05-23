
import React, { useState, useEffect } from 'react';

export const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll('a, button');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => setLinkHovered(true));
        link.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', () => setHidden(false));
    document.addEventListener('mouseleave', () => setHidden(true));
    document.addEventListener('mousedown', () => setClicked(true));
    document.addEventListener('mouseup', () => setClicked(false));
    
    handleLinkHoverEvents();
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', () => setHidden(false));
      document.removeEventListener('mouseleave', () => setHidden(true));
      document.removeEventListener('mousedown', () => setClicked(true));
      document.removeEventListener('mouseup', () => setClicked(false));
    };
  }, []);

  const cursorClasses = `
    fixed pointer-events-none z-50 transition-all duration-150 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-75' : 'scale-100'}
    ${linkHovered ? 'scale-150' : 'scale-100'}
  `;

  return (
    <>
      <div 
        className={`${cursorClasses} w-6 h-6 rounded-full border-2 border-thrive-olive top-0 left-0`}
        style={{ 
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
          mixBlendMode: 'difference'
        }}
      />
      <div 
        className={`${cursorClasses} w-2 h-2 bg-thrive-yellow top-0 left-0`}
        style={{ 
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};
