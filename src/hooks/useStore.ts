// Hook customizado para usar o store com seletores otimizados
import { useAppStore } from "../store";

// Seletores otimizados para evitar re-renders desnecessários
export const useCount = () => useAppStore((state) => state.count);
export const useCountActions = () =>
  useAppStore((state) => ({
    increment: state.increment,
    decrement: state.decrement,
    reset: state.reset,
  }));

// Exemplo de como criar seletores customizados
export const useIsCountPositive = () => useAppStore((state) => state.count > 0);
