import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  isLoading: boolean;
}

interface AppActions {
  setLoading: (loading: boolean) => void;
  clearApp: () => void;
}

interface AppStore extends AppState, AppActions {}

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      isLoading: false,

      setLoading: (loading: boolean) =>
        set({ isLoading: loading }, false, "app/setLoading"),
      clearApp: () => set({ isLoading: false }, false, "app/clearApp"),
    }),
    {
      name: "app-store",
    }
  )
);
