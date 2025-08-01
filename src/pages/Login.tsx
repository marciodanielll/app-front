import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  const handleRegister = () => {
    console.log('Ir para cadastro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
      </div>

      {/* Login Card */}
      <Card variant="glass" className="w-full max-w-md relative">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="5" strokeWidth={2}/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 10.5L10 12l4-4"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 18v1a1 1 0 001 1h8a1 1 0 001-1v-1"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 18l1-5h8l1 5H7z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            M.D. Care
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            showPasswordToggle
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
              Esqueceu a senha?
            </button>
          </div>

          <Button
            type="submit"
            variant="gradient"
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        {/* Register link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <button
              onClick={handleRegister}
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Cadastre-se
            </button>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.8906 14.7969C18.7813 12.1406 21.0156 10.8281 21.125 10.7656C19.8594 8.84375 17.8438 8.5625 17.125 8.53125C15.3906 8.35938 13.7188 9.54688 12.8438 9.54688C11.9531 9.54688 10.5938 8.5625 9.14063 8.59375C7.29688 8.625 5.57813 9.70313 4.60938 11.4688C2.60938 15.0469 4.09375 20.4688 6.01563 23.4688C6.96875 24.9219 8.09375 26.5469 9.59375 26.4844C11.0156 26.4219 11.5625 25.5781 13.3125 25.5781C15.0469 25.5781 15.5625 26.4844 17.0469 26.4531C18.5781 26.4219 19.5469 25.0156 20.4688 23.5469C21.5469 21.8906 21.9688 20.2656 21.9844 20.1875C21.9531 20.1719 18.9219 19.0156 18.8906 14.7969ZM15.9844 6.84375C16.7656 5.9375 17.2813 4.71875 17.1563 3.5C16.0781 3.54688 14.7656 4.25 13.9531 5.125C13.2188 5.90625 12.5625 7.15625 12.7031 8.34375C13.9219 8.4375 15.1719 7.71875 15.9844 6.84375Z"/>
              </svg>
              <span className="ml-2">Apple</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}