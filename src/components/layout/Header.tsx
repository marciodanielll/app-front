interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export function Header({ title = 'HealthApp', children }: HeaderProps) {
  return (
    <header className="bg-emerald-600 border-b border-emerald-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {children && <div className="flex items-center space-x-4 ml-auto">{children}</div>}
        </div>
      </div>
    </header>
  );
}