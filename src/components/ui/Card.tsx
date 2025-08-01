interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:bg-gray-700 ${className}`}>
      {children}
    </div>
  );
}