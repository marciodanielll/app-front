import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { authService } from "../services/authService";
import { useSetAuthenticated, useSetAccessToken, useSetRefreshToken, useSetTokenExpiration, useSetUser, useIsLoading, useSetLoading } from "../store";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLoading = useIsLoading();
  const setAuthenticated = useSetAuthenticated();
  const setAccessToken = useSetAccessToken();
  const setRefreshToken = useSetRefreshToken();
  const setTokenExpiration = useSetTokenExpiration();
  const setUser = useSetUser();
  const setLoading = useSetLoading();

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col">
      {/* Login Container */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo/Icon */}
          <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-3xl mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-gray-300"
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
          <h1 className="text-3xl font-bold text-white mb-1">
            TCC
          </h1>
          <p className="text-gray-400 text-sm">Bem-vindo de volta</p>
        </div>

          {/* Form */}
          <div className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border-l-4 border-red-500 text-red-400 px-4 py-3 rounded-r text-sm">
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
                className="h-14 px-4 text-base bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                showPasswordToggle
                className="h-14 px-4 text-base bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
            </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-gray-300 focus:ring-gray-500"
              />
              <span className="ml-3 text-sm text-gray-400">Lembrar de mim</span>
            </label>
            <button
              type="button"
              className="text-sm text-gray-300 hover:text-white font-medium"
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
              className="w-full h-14 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
        </div>

          {/* Register link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Não tem uma conta?{" "}
              <button
                onClick={handleRegister}
                className="text-gray-300 hover:text-white font-semibold transition-colors"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                Ou continue com
              </span>
            </div>
          </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full inline-flex items-center justify-center py-4 px-4 border border-gray-700 rounded-xl shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span className="ml-2">Google</span>
            </button>

              <button className="w-full inline-flex items-center justify-center py-4 px-4 border border-gray-700 rounded-xl shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.8906 14.7969C18.7813 12.1406 21.0156 10.8281 21.125 10.7656C19.8594 8.84375 17.8438 8.5625 17.125 8.53125C15.3906 8.35938 13.7188 9.54688 12.8438 9.54688C11.9531 9.54688 10.5938 8.5625 9.14063 8.59375C7.29688 8.625 5.57813 9.70313 4.60938 11.4688C2.60938 15.0469 4.09375 20.4688 6.01563 23.4688C6.96875 24.9219 8.09375 26.5469 9.59375 26.4844C11.0156 26.4219 11.5625 25.5781 13.3125 25.5781C15.0469 25.5781 15.5625 26.4844 17.0469 26.4531C18.5781 26.4219 19.5469 25.0156 20.4688 23.5469C21.5469 21.8906 21.9688 20.2656 21.9844 20.1875C21.9531 20.1719 18.9219 19.0156 18.8906 14.7969ZM15.9844 6.84375C16.7656 5.9375 17.2813 4.71875 17.1563 3.5C16.0781 3.54688 14.7656 4.25 13.9531 5.125C13.2188 5.90625 12.5625 7.15625 12.7031 8.34375C13.9219 8.4375 15.1719 7.71875 15.9844 6.84375Z" />
              </svg>
              <span className="ml-2">Apple</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
