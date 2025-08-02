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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={handleViewHistory}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ver Histórico
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Sair
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            TCC
          </h1>
          <p className="text-gray-600 text-lg">
            Documente seus pensamentos e reflexões do dia
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
                placeholder="Escreva aqui seus pensamentos, sentimentos ou reflexões do dia..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[300px] p-4 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         bg-white/70 backdrop-blur-sm resize-none
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading || !title.trim() || !text.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 text-white
                         disabled:opacity-50 disabled:cursor-not-allowed"
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