// Tipos para as stores da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppState {
  // Exemplo de estados que você pode ter
  user: User | null;
  isLoading: boolean;
  theme: "light" | "dark";
}

// Tipos para actions
export interface AppActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  clearStore: () => void;
}
