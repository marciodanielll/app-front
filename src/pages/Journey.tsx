import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    resetAll();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Fixed at top */}
      <div className="bg-white shadow-sm">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">TCC</h1>
              <p className="text-xs text-gray-500">Diário Pessoal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={handleViewHistory} disabled className="p-2 bg-gray-100 rounded-lg opacity-50 cursor-not-allowed">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button onClick={handleLogout} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Welcome Section */}
        <div className="text-center px-3 pb-3">
          <h2 className="text-sm font-semibold text-gray-900">Como você está se sentindo hoje?</h2>
          <p className="text-xs text-gray-600">Documente seus pensamentos e reflexões do dia</p>
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
              className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white focus:bg-white shadow-sm"
              disabled={isLoading}
            />
          </div>

          {/* Textarea - Takes ALL remaining space */}
          <textarea
            placeholder="Conte-me sobre seus pensamentos, sentimentos e reflexões de hoje..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 w-full p-3 border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     bg-white resize-none text-sm transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-sm
                     mb-3 min-h-0"
            disabled={isLoading}
          />

          {/* Button - Fixed at bottom */}
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !text.trim()}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed text-sm flex-shrink-0"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Salvando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Salvar Reflexão</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}