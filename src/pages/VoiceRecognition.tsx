import React, { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const VoiceRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "pt-BR";

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + " ";
          } else {
            interimTranscript += transcriptPart;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Erro no reconhecimento:", event.error);
        setIsListening(false);
        stopAudioAnalysis();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        stopAudioAnalysis();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopAudioAnalysis();
    };
  }, []);

  const startAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current =
        audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      microphoneRef.current.connect(analyserRef.current);

      const updateAudioLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calcula a média do nível de áudio
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average);

          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };

      updateAudioLevel();
    } catch (error) {
      console.error("Erro ao acessar microfone:", error);
    }
  };

  const stopAudioAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setAudioLevel(0);
  };

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setIsListening(true);
      setTranscript("");
      recognitionRef.current.start();
      startAudioAnalysis();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    stopAudioAnalysis();
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  const pulseIntensity = isListening ? Math.min(audioLevel / 50, 3) + 1 : 1;
  const pulseColor =
    audioLevel > 30 ? "#ef4444" : audioLevel > 15 ? "#f59e0b" : "#10b981";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎤 Reconhecimento de Voz com Efeito
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Microfone pulsa quando detecta som - Conversão de voz para texto
      </p>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Status de suporte */}
          {!isSupported && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              ❌ Seu navegador não suporta reconhecimento de voz
            </div>
          )}

          {/* Microfone com efeito visual */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Círculos de pulsação */}
              {isListening && (
                <>
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: pulseColor,
                      opacity: 0.3,
                      transform: `scale(${pulseIntensity})`,
                      transition: "all 0.1s ease-out",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      backgroundColor: pulseColor,
                      opacity: 0.2,
                      transform: `scale(${pulseIntensity * 1.2})`,
                      transition: "all 0.1s ease-out",
                    }}
                  />
                </>
              )}

              {/* Botão do microfone */}
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={!isSupported}
                className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center text-4xl transition-all duration-200 ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                } ${
                  !isSupported
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                style={{
                  transform: isListening
                    ? `scale(${1 + audioLevel / 200})`
                    : "scale(1)",
                  boxShadow: isListening
                    ? `0 0 ${audioLevel / 2}px ${pulseColor}`
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                {isListening ? "🔴" : "🎤"}
              </button>
            </div>
          </div>

          {/* Indicador de nível de áudio */}
          {isListening && (
            <div className="text-center">
              <div className="inline-block">
                <div className="text-sm font-medium mb-2">Nível de Áudio:</div>
                <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-100 ease-out"
                    style={{
                      width: `${Math.min((audioLevel / 100) * 100, 100)}%`,
                      backgroundColor: pulseColor,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(audioLevel)}/100
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="text-center">
            <div
              className={`inline-block px-4 py-2 rounded-md text-sm font-medium ${
                isListening
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {isListening ? "🔴 Ouvindo..." : "⏸️ Parado"}
            </div>
          </div>

          {/* Controles */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={!isSupported}
              className="px-6 py-2"
            >
              {isListening ? "⏹️ Parar" : "🎤 Iniciar"}
            </Button>

            {transcript && (
              <Button
                onClick={clearTranscript}
                variant="secondary"
                className="px-6 py-2"
              >
                🗑️ Limpar
              </Button>
            )}
          </div>

          {/* Resultado do reconhecimento */}
          <div>
            <label className="block text-sm font-medium mb-2">
              📝 Texto reconhecido:
            </label>
            <div className="min-h-[100px] p-4 bg-gray-50 border rounded-md">
              {transcript ? (
                <p className="text-lg leading-relaxed">{transcript}</p>
              ) : (
                <p className="text-gray-500 italic">
                  {isListening
                    ? "Fale algo..."
                    : "Clique no microfone para começar"}
                </p>
              )}
            </div>
            {transcript && (
              <div className="text-sm text-gray-600 mt-1">
                Caracteres: {transcript.length}
              </div>
            )}
          </div>

          {/* Instruções */}
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md">
            <h3 className="font-semibold mb-2">🎯 Como usar:</h3>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Clique no microfone</strong> para começar a ouvir
              </li>
              <li>
                • <strong>Fale normalmente</strong> em português
              </li>
              <li>
                • <strong>O microfone pulsa</strong> quando detecta sua voz
              </li>
              <li>
                • <strong>A cor muda</strong> conforme a intensidade do som
              </li>
            </ul>
          </div>

          {/* Efeitos visuais */}
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
            <h3 className="font-semibold mb-2">✨ Efeitos visuais:</h3>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>🟢 Verde:</strong> Som baixo
              </li>
              <li>
                • <strong>🟡 Amarelo:</strong> Som médio
              </li>
              <li>
                • <strong>🔴 Vermelho:</strong> Som alto
              </li>
              <li>
                • <strong>Pulsação:</strong> Intensidade baseada no volume
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceRecognition;
