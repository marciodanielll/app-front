import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-3xl p-8 shadow-2xl transition-all duration-200';
  
  const variantStyles = variant === 'glass' 
    ? 'bg-white/80 backdrop-blur-sm border border-white/20' 
    : 'bg-white border border-gray-200 hover:shadow-xl';

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </div>
  );
}