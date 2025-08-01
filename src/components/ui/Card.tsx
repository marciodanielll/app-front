interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-emerald-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 hover:bg-emerald-50 ${className}`}>
      {children}
    </div>
  );
}