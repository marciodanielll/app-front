import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { authService } from "../services/authService";
import { useStore, useSetUser, useIsLoading, useSetLoading } from "../store";
import { LogIn, Loader2 } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLoading = useIsLoading();
  const setUser = useSetUser();
  const setLoading = useSetLoading();
  
  // Usando acesso direto ao store para evitar problemas
  const setAuthenticated = useStore((state) => state.auth.setAuthenticated);
  const setAccessToken = useStore((state) => state.auth.setAccessToken);
  const setRefreshToken = useStore((state) => state.auth.setRefreshToken);
  const setTokenExpiration = useStore((state) => state.auth.setTokenExpiration);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("🔄 Iniciando login...");

      const response = await authService.login({ email, password });

      console.log("✅ Login realizado com sucesso:", response);

      const expirationDate = new Date(response.accessTokenExpiresAt);

      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setTokenExpiration(expirationDate);
      setAuthenticated(true);
      if (response.user) {
        setUser({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          password: "",
          birthDate: "",
          phone: "",
          age: response.user.age,
          role: response.user.role,
        });
      }

      console.log("🎉 Login concluído com sucesso!");
      
      navigate("/journey");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    console.log("Ir para cadastro");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-vital-700 to-vital-900 flex flex-col">
      {/* Login Container */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo/Icon */}
          <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-4 shadow-lg border border-vital-200">
            <svg
              className="w-10 h-10 text-vital-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
            TCC
          </h1>
          <p className="text-white/90 text-sm drop-shadow-md">Bem-vindo de volta</p>
        </div>

          {/* Form */}
          <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r text-sm">
              {error}
            </div>
          )}

            <div className="space-y-5">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="h-14 px-4 text-base bg-white border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl hover:bg-white hover:border-vital-400 focus:ring-2 focus:ring-vital-500 focus:border-vital-500 focus:bg-white transition-all duration-200 outline-none shadow-md autofill:bg-white autofill:text-gray-800 [&:not(:placeholder-shown)]:bg-white [&:not(:placeholder-shown)]:border-vital-400 [&:not(:placeholder-shown)]:ring-1 [&:not(:placeholder-shown)]:ring-vital-300/50"
              />

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                showPasswordToggle
                className="h-14 px-4 text-base bg-white border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl hover:bg-white hover:border-vital-400 focus:ring-2 focus:ring-vital-500 focus:border-vital-500 focus:bg-white transition-all duration-200 outline-none shadow-md autofill:bg-white autofill:text-gray-800 [&:not(:placeholder-shown)]:bg-white [&:not(:placeholder-shown)]:border-vital-400 [&:not(:placeholder-shown)]:ring-1 [&:not(:placeholder-shown)]:ring-vital-300/50"
              />
            </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-200 bg-white text-vital-600 focus:ring-2 focus:ring-vital-500 focus:border-vital-500 transition-all duration-200"
              />
              <span className="ml-3 text-sm text-white/90 drop-shadow-sm">Lembrar de mim</span>
            </label>
            <button
              type="button"
              className="text-sm text-vital-300 hover:text-vital-200 font-medium transition-colors duration-200 drop-shadow-sm"
            >
              Esqueceu a senha?
            </button>
          </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#10b981] hover:to-[#059669] active:from-[#047857] active:to-[#065f46] disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:scale-100 text-lg border border-green-600/30 hover:border-green-500/50"
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Entrar</span>
                  </>
                )}
              </div>
            </button>
        </div>

          {/* Register link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/90 drop-shadow-sm">
              Não tem uma conta?{" "}
              <button
                onClick={handleRegister}
                className="text-vital-300 hover:text-vital-200 font-semibold transition-colors duration-200 drop-shadow-sm"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-12">
                      <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-lg shadow-lg border border-white/20 font-medium">
                Ou continue com
              </span>
            </div>
          </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="group w-full inline-flex items-center justify-center py-4 px-4 border border-gray-200 rounded-xl shadow-md bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-vital-400 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <span className="group-hover:text-gray-800 transition-colors">Google</span>
                </div>
              </button>

              <button className="group w-full inline-flex items-center justify-center py-4 px-4 border border-gray-200 rounded-xl shadow-md bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-vital-400 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-800">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <span className="group-hover:text-gray-800 transition-colors">Apple</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
