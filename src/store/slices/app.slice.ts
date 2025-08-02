import { StateCreator } from "zustand";
import { AppState, AppActions } from "../../types/app";
import { AuthState, AuthActions } from "../../types/auth";
import { UserState, UserActions } from "../../types/user";
import { JourneyState, JourneyActions } from "../../types/journey";

export const initialAppState: AppState = {
  isLoading: false,
};

interface CombinedStore {
  auth: AuthState & AuthActions;
  user: UserState & UserActions;
  app: AppState & AppActions;
  journey: JourneyState & JourneyActions;
  resetAll: () => void;
}

export const createAppSlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  AppState & AppActions
> = (set) => ({
  ...initialAppState,

  setLoading: (loading: boolean) =>
    set(
      (state: CombinedStore) => ({
        app: { ...state.app, isLoading: loading },
      }),
      false,
      "app/setLoading"
    ),

  clearApp: () =>
    set(
      (state: CombinedStore) => ({
        app: { ...state.app, ...initialAppState },
      }),
      false,
      "app/clearApp"
    ),
});
