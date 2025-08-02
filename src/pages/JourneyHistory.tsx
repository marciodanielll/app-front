import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useJourneyEntries, useDeleteJourneyEntry } from "../store";

export function JourneyHistory() {
  const entries = useJourneyEntries();
  const deleteEntry = useDeleteJourneyEntry();

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta entrada?")) {
      deleteEntry(id);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Data não disponível";
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4">
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Histórico da sua Jornada
          </h1>
          <p className="text-gray-600 text-lg">
            Revise e reflita sobre suas experiências passadas
          </p>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {entries.length === 0 ? (
            <Card variant="glass" className="p-8 text-center">
              <div className="text-gray-500">
                <p className="text-xl mb-4">📝</p>
                <p className="text-lg font-medium mb-2">Nenhuma entrada ainda</p>
                <p>Comece a documentar sua jornada criando sua primeira entrada!</p>
              </div>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} variant="glass" className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(entry.createdAt)}
                    </p>
                  </div>
                  <Button
                    onClick={() => entry.id && handleDelete(entry.id)}
                    className="text-red-600 hover:text-red-800 bg-transparent hover:bg-red-50 border-0 p-2"
                  >
                    🗑️
                  </Button>
                </div>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {entry.text}
                  </p>
                </div>
                
                {entry.updatedAt && entry.updatedAt !== entry.createdAt && (
                  <p className="text-xs text-gray-400 mt-4">
                    Editado em: {formatDate(entry.updatedAt)}
                  </p>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Stats */}
        {entries.length > 0 && (
          <div className="mt-8">
            <Card variant="glass" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {entries.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {entries.length === 1 ? "Entrada" : "Entradas"} Total
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {entries.reduce((sum, entry) => sum + entry.text.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Caracteres Escritos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(entries.reduce((sum, entry) => sum + entry.text.split(" ").length, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Palavras Escritas</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
