import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAccessToken,
  useAddJourneyEntry,
  useSetJourneyLoading,
  useIsJourneyLoading,
  useResetAll,
} from "../store";
import { journeyService } from "../services/journeyService";
import { Save, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export function Journey() {
  const [text, setText] = useState("");
  const [isActivelyListening, setIsActivelyListening] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const token = useAccessToken();
  const addEntry = useAddJourneyEntry();
  const setLoading = useSetJourneyLoading();
  const isLoading = useIsJourneyLoading();
  const resetAll = useResetAll();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Detecta quando o usuário para de falar
  useEffect(() => {
    if (transcript && listening) {
      setIsActivelyListening(true);
      
      // Limpa o timeout anterior se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Define um novo timeout para detectar quando parar de falar
      timeoutRef.current = setTimeout(() => {
        setIsActivelyListening(false);
      }, 1500); // 1.5 segundos sem falar
    } else if (!transcript) {
      setIsActivelyListening(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [transcript, listening]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: "pt-BR", continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    if (transcript) {
      setText((prev) => prev + (prev ? " " : "") + transcript);
    }

    resetTranscript();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Por favor, escreva algo sobre seu dia");
      return;
    }

    if (!token) {
      alert("Você precisa estar logado para criar uma entrada");
      return;
    }

    try {
      setLoading(true);

      const newEntry = await journeyService.createJournal(
        {
          title: "Reflexão do dia",
          text: text.trim(),
        },
        token
      );

      addEntry({
        title: "Reflexão do dia",
        text: text.trim(),
      });

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
    <div className="min-h-screen bg-gradient-to-b from-vital-700 to-vital-900 flex flex-col">
      {/* Header - Fixed at top */}
      <div className="bg-white/10 backdrop-blur-sm shadow-lg border-b border-white/20">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-vital-200">
              <svg
                className="w-6 h-6 text-vital-600"
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
            <div>
              <h1 className="text-lg font-bold text-white drop-shadow-lg">
                TCC
              </h1>
              <p className="text-xs text-white/80 drop-shadow-md">
                Diário Pessoal
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleViewHistory}
              disabled
              className="p-3 bg-white/10 rounded-xl opacity-50 cursor-not-allowed backdrop-blur-sm border border-white/20"
            >
              <svg
                className="w-5 h-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
            >
              <svg
                className="w-5 h-5 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="text-center px-4 pb-4">
          <h2 className="text-xl font-bold text-white drop-shadow-lg mb-1">
            Como você está se sentindo hoje?
          </h2>
          <p className="text-sm text-white/80 drop-shadow-md">
            Documente seus pensamentos e reflexões do dia
          </p>
        </div>
      </div>

      {/* Main Content - Takes all available space */}
      <div className="flex-1 px-6 py-4 flex flex-col min-h-0">
        <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col min-h-0">
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Textarea - Takes ALL remaining space */}
            <div className="flex-1 min-h-0 relative mb-6">
              <textarea
                placeholder="Conte-me sobre seus pensamentos, sentimentos e reflexões de hoje..."
                value={text + (listening && transcript ? " " + transcript : "")}
                onChange={(e) => setText(e.target.value)}
                className="absolute inset-0 w-full h-full p-4 pr-16 border border-gray-200 rounded-2xl 
                         hover:bg-white hover:border-vital-400
                         focus:ring-2 focus:ring-vital-500 focus:border-vital-500 focus:bg-white
                         bg-white text-gray-800 placeholder-gray-400 resize-none text-base transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed shadow-lg outline-none
                         autofill:bg-white autofill:text-gray-800"
                disabled={isLoading}
              />
              {browserSupportsSpeechRecognition && (
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  className={`absolute top-4 right-4 p-3 rounded-xl transition-all duration-200 z-10 shadow-lg ${
                    listening
                      ? isActivelyListening
                        ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/25 voice-speaking"
                        : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25 voice-listening"
                      : "bg-gradient-to-r from-vital-500 to-vital-600 hover:from-vital-600 hover:to-vital-700 text-white shadow-vital-500/25"
                  }`}
                  disabled={isLoading}
                  title={listening ? "Parar de escutar" : "Falar para escrever"}
                >
                  {listening ? (
                    <Mic
                      className={`w-5 h-5 ${
                        isActivelyListening ? "animate-bounce" : "animate-pulse"
                      }`}
                    />
                  ) : (
                    <MicOff className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {!browserSupportsSpeechRecognition && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <span className="text-sm text-yellow-700 font-medium">
                  Seu navegador não suporta reconhecimento de voz
                </span>
              </div>
            )}

            {/* Button - Fixed at bottom */}
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="w-full py-4 px-6 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-800">Salvando...</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 text-gray-800">📄</div>
                    <span className="text-gray-800">Salvar Reflexão</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
