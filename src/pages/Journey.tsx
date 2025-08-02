import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken, useAddJourneyEntry, useSetJourneyLoading, useIsJourneyLoading, useResetAll } from "../store";
import { journeyService } from "../services/journeyService";
import { Save, Loader2 } from "lucide-react";

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
    resetAll();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header - Fixed at top */}
      <div className="bg-slate-800 shadow-sm">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">TCC</h1>
              <p className="text-xs text-slate-300">Diário Pessoal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={handleViewHistory} disabled className="p-2 bg-slate-700 rounded-lg opacity-50 cursor-not-allowed">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button onClick={handleLogout} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Welcome Section */}
        <div className="text-center px-3 pb-3">
          <h2 className="text-sm font-semibold text-white">Como você está se sentindo hoje?</h2>
          <p className="text-xs text-slate-300">Documente seus pensamentos e reflexões do dia</p>
        </div>
      </div>

      {/* Main Content - Takes all available space */}
      <div className="flex-1 p-3 flex flex-col min-h-0">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          {/* Title Input - Compact */}
          <div className="mb-3 flex-shrink-0">
            <input
              type="text"
              placeholder="Como foi seu dia?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-9 px-3 text-sm border border-slate-600 rounded-lg hover:bg-slate-600 hover:border-slate-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-slate-600 transition-all duration-200 bg-slate-700 text-white placeholder-slate-400 shadow-sm outline-none autofill:bg-slate-700 autofill:text-white"
              disabled={isLoading}
            />
          </div>

          {/* Textarea - Takes ALL remaining space */}
          <textarea
            placeholder="Conte-me sobre seus pensamentos, sentimentos e reflexões de hoje..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 w-full p-3 border border-slate-600 rounded-lg 
                     hover:bg-slate-600 hover:border-slate-500
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-slate-600
                     bg-slate-700 text-white placeholder-slate-400 resize-none text-sm transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-sm outline-none
                     mb-3 min-h-0 autofill:bg-slate-700 autofill:text-white"
            disabled={isLoading}
          />

          {/* Button - Fixed at bottom */}
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !text.trim()}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 active:from-emerald-700 active:via-teal-700 active:to-cyan-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed disabled:scale-100 text-sm flex-shrink-0 border border-emerald-400/20 hover:border-emerald-400/40"
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Salvar Reflexão</span>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}