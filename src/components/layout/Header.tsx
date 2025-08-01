interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export function Header({ title = 'HealthApp', children }: HeaderProps) {
  return (
    <header className="bg-white border-b border-emerald-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-emerald-800">{title}</h1>
          {children && <div className="flex items-center space-x-4">{children}</div>}
        </div>
      </div>
    </header>
  );
}