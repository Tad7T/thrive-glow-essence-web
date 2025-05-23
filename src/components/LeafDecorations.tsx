
import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

type Position = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: string;
  delay?: string;
};

type LeafProps = {
  position: Position;
  color?: string;
  size?: number;
  className?: string;
};

const AnimatedLeaf = ({ position, color = "#B9BA63", size = 24, className }: LeafProps) => {
  const { top, bottom, left, right, rotate = "0deg", delay = "0s" } = position;
  
  return (
    <div 
      className={cn(
        "absolute opacity-10 animate-sway z-0",
        className
      )}
      style={{ 
        top, 
        bottom, 
        left, 
        right, 
        transform: `rotate(${rotate})`,
        animationDelay: delay
      }}
    >
      <Leaf size={size} color={color} />
    </div>
  );
};

const LeafDecorations = () => {
  const leaves = [
    { position: { top: "5%", left: "5%", rotate: "45deg", delay: "0s" }, size: 40 },
    { position: { top: "10%", right: "10%", rotate: "-30deg", delay: "1s" }, size: 32 },
    { position: { bottom: "15%", left: "15%", rotate: "15deg", delay: "2s" }, size: 48 },
    { position: { bottom: "25%", right: "8%", rotate: "-15deg", delay: "1.5s" }, size: 36 },
    { position: { top: "40%", left: "3%", rotate: "60deg", delay: "0.5s" }, size: 28 },
    { position: { top: "60%", right: "5%", rotate: "-60deg", delay: "0.8s" }, size: 44 },
    { position: { bottom: "5%", left: "40%", rotate: "30deg", delay: "1.2s" }, size: 38 },
  ];

  return (
    <div className="leaf-container fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {leaves.map((leaf, index) => (
        <AnimatedLeaf
          key={index}
          position={leaf.position}
          size={leaf.size}
          color="#B9BA63"
        />
      ))}
    </div>
  );
};

export default LeafDecorations;
