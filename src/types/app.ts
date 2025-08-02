export interface AppState {
  isLoading: boolean;
}

export interface AppActions {
  setLoading: (loading: boolean) => void;
  clearApp: () => void;
}
