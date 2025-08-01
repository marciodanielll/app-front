import { useAppStore } from "../store/appStore";

export const useIsLoading = () => useAppStore((state) => state.isLoading);

export const useAppActions = () =>
  useAppStore((state) => ({
    setLoading: state.setLoading,
    clearApp: state.clearApp,
  }));
