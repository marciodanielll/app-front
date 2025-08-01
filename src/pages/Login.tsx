import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-teal-50 flex flex-col">
      <Header title="🏥 HealthApp - Bem-vindo" />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800 mb-2">🏥 HealthApp</h1>
            <p className="text-teal-600">Entre na sua conta</p>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              onClick={handleLogin}
              className="w-full"
              color="emerald"
            >
              Entrar
            </Button>
            
            <div className="text-center">
              <span className="text-teal-600">Não tem conta? </span>
              <button
                onClick={handleRegister}
                className="text-emerald-700 hover:text-emerald-800 font-medium"
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
}