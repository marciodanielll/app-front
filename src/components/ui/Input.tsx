interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  id?: string;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  label,
  id
}: InputProps) {
  const inputId = id || label;
  
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${className}`}
      />
    </div>
  );
}