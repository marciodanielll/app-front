interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  color?: 'vital' | 'trust' | 'energy' | 'calm' | 'care' | 'fresh';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  color = 'trust',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md';
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  const variantClasses = variant === 'primary'
    ? `bg-${color}-500 hover:bg-${color}-600 text-white`
    : `border-2 border-${color}-500 text-${color}-400 hover:bg-${color}-500 hover:text-white`;

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}