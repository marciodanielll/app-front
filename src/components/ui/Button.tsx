interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient';
  color?: 'vital' | 'trust' | 'energy' | 'calm' | 'care' | 'fresh' | 'emerald' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  color = 'emerald',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]';
  let colorStyles = '';

  if (variant === 'gradient') {
    colorStyles = 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700';
  } else {
    switch (color) {
      case 'vital':
        colorStyles = 'bg-vital-500 hover:bg-vital-600 text-white';
        break;
      case 'trust':
        colorStyles = 'bg-trust-500 hover:bg-trust-600 text-white';
        break;
      case 'energy':
        colorStyles = 'bg-energy-500 hover:bg-energy-600 text-white';
        break;
      case 'calm':
        colorStyles = 'bg-calm-500 hover:bg-calm-600 text-white';
        break;
      case 'care':
        colorStyles = 'bg-care-500 hover:bg-care-600 text-white';
        break;
      case 'fresh':
        colorStyles = 'bg-fresh-500 hover:bg-fresh-600 text-white';
        break;
      case 'emerald':
        colorStyles = 'bg-emerald-500 hover:bg-emerald-600 text-white';
        break;
      case 'blue':
        colorStyles = 'bg-blue-600 hover:bg-blue-700 text-white';
        break;
      default:
        colorStyles = 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  }

  const variantStyles = variant === 'secondary' ? 'bg-transparent border-2 border-current text-current hover:bg-current hover:text-white' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${colorStyles} ${variantStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}