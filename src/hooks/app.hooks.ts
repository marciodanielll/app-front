import { useStore } from "../store/store";

export const useIsLoading = () => useStore((state) => state.app.isLoading);
export const useSetLoading = () => useStore((state) => state.app.setLoading);
export const useClearApp = () => useStore((state) => state.app.clearApp);
export const useResetAll = () => useStore((state) => state.resetAll);
