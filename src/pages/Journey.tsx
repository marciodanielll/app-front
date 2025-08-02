import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAccessToken, useAddJourneyEntry, useSetJourneyLoading, useIsJourneyLoading } from "../store";
import { journeyService } from "../services/journeyService";

export function Journey() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  
  const token = useAccessToken();
  const addEntry = useAddJourneyEntry();
  const setLoading = useSetJourneyLoading();
  const isLoading = useIsJourneyLoading();

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
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={handleViewHistory}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              📚 Ver Histórico
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              🚪 Sair
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🧠 TCC - Sua Jornada
          </h1>
          <p className="text-gray-600 text-lg">
            Documente seus pensamentos e reflexões na terapia cognitivo comportamental
          </p>
        </div>

        {/* Form */}
        <Card variant="glass" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Título da sua reflexão..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                disabled={isLoading}
              />
            </div>

            <div>
              <textarea
                placeholder="Escreva aqui seus pensamentos, sentimentos ou reflexões sobre sua sessão de terapia..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         bg-white/70 backdrop-blur-sm resize-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading || !title.trim() || !text.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700 text-white
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Salvando..." : "💾 Salvar Entrada"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Tips */}
        <Card variant="glass" className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 Dicas para sua reflexão:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Como você se sentiu durante a sessão?</li>
            <li>• Quais insights você teve sobre seus pensamentos?</li>
            <li>• Que padrões você conseguiu identificar?</li>
            <li>• O que você gostaria de trabalhar na próxima sessão?</li>
            <li>• Houve alguma técnica que funcionou bem para você?</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}