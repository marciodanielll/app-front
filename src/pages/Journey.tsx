import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useIsLoading, useSetLoading } from "../store";

interface JourneyEntry {
  title: string;
  text: string;
}

export function Journey() {
  const [entry, setEntry] = useState<JourneyEntry>({
    title: "",
    text: "",
  });

  const isLoading = useIsLoading();
  const setLoading = useSetLoading();

  const handleSave = async () => {
    if (!entry.title.trim() || !entry.text.trim()) {
      return;
    }

    try {
      setLoading(true);
      console.log("💾 Salvando entrada do dia:", entry);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEntry({
        title: "",
        text: "",
      });

      console.log("✅ Entrada salva com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao salvar entrada:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Como foi seu dia hoje?
          </h1>
          <p className="text-gray-600 text-lg">
            Conte-nos sobre sua jornada de hoje
          </p>
        </div>

        {/* Form */}
        <Card variant="glass" className="p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do seu dia
              </label>
              <Input
                placeholder="Ex: Um dia produtivo e inspirador"
                value={entry.title}
                onChange={(e) =>
                  setEntry((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            {/* Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conte como foi seu dia
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={8}
                placeholder="Descreva os principais eventos, sentimentos e experiências do seu dia..."
                value={entry.text}
                onChange={(e) =>
                  setEntry((prev) => ({ ...prev, text: e.target.value }))
                }
              />
            </div>

            {/* Save Button */}
            <div className="text-center">
              <Button
                onClick={handleSave}
                variant="gradient"
                className="px-12 py-4 text-lg"
                disabled={
                  isLoading || !entry.title.trim() || !entry.text.trim()
                }
              >
                {isLoading ? "Salvando..." : "💾 Salvar Jornada do Dia"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
