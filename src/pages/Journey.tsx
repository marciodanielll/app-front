import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAccessToken, useAddJourneyEntry, useSetJourneyLoading, useIsJourneyLoading, useResetAll } from "../store";
import { journeyService } from "../services/journeyService";

export function Journey() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  
  const token = useAccessToken();
  const addEntry = useAddJourneyEntry();
  const setLoading = useSetJourneyLoading();
  const isLoading = useIsJourneyLoading();
  const resetAll = useResetAll();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !text.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (!token) {
      alert("Você precisa estar logado para criar uma entrada");
      return;
    }

    try {
      setLoading(true);
      
      const newEntry = await journeyService.createJournal({
        title: title.trim(),
        text: text.trim()
      }, token);

      addEntry({
        title: title.trim(),
        text: text.trim()
      });

      setTitle("");
      setText("");
      
      alert("Entrada criada com sucesso!");
      
    } catch (error) {
      console.error("Erro ao criar entrada:", error);
      alert("Erro ao criar entrada. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigate("/journey/history");
  };

  const handleLogout = () => {
    // Limpa todo o estado global
    resetAll();
    
    // Redireciona para login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6">
      <div className="relative max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <Button
              onClick={handleViewHistory}
              disabled
              className="w-full sm:w-auto bg-gray-400 text-gray-600 cursor-not-allowed text-sm sm:text-base"
            >
              Ver Histórico
            </Button>
            <Button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base"
            >
              Sair
            </Button>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            TCC
          </h1>
          <p className="text-gray-600 text-base sm:text-lg px-2 sm:px-0">
            Documente seus pensamentos e reflexões do dia
          </p>
        </div>

        {/* Form */}
        <Card variant="glass" className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Título da sua reflexão..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base sm:text-lg"
                disabled={isLoading}
              />
            </div>

            <div>
              <textarea
                placeholder="Escreva aqui seus pensamentos, sentimentos ou reflexões do dia..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[200px] sm:min-h-[300px] p-3 sm:p-4 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white/70 backdrop-blur-sm resize-none text-sm sm:text-base
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading || !title.trim() || !text.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 text-white text-sm sm:text-base
                         disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-2"
              >
                {isLoading ? "Salvando..." : "Salvar Entrada"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}