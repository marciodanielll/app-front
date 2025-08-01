interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export function Header({ title = 'HealthApp', children }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {children && <div className="flex items-center space-x-4">{children}</div>}
        </div>
      </div>
    </header>
  );
}