import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Exemplo de interface para tipagem do estado
interface AppState {
  // Adicione aqui os tipos do seu estado
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Store principal da aplicação
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Estado inicial
      count: 0,

      // Actions
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "app-store", // Nome para o DevTools
    }
  )
);
