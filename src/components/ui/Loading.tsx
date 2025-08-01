interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'vital' | 'trust' | 'energy' | 'calm' | 'care' | 'fresh';
}

export function Loading({ size = 'md', color = 'trust' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-600 border-t-${color}-500`}></div>
  );
}