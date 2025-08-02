import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthState, AuthActions } from "../types/auth";
import { UserState, UserActions } from "../types/user";
import { AppState, AppActions } from "../types/app";
import { JourneyState, JourneyActions } from "../types/journey";
import { createAuthSlice, initialAuthState } from "./slices/auth.slice";
import { createUserSlice, initialUserState } from "./slices/user.slice";
import { createAppSlice, initialAppState } from "./slices/app.slice";
import {
  createJourneySlice,
  initialJourneyState,
} from "./slices/journey.slice";

interface CombinedStore {
  auth: AuthState & AuthActions;
  user: UserState & UserActions;
  app: AppState & AppActions;
  journey: JourneyState & JourneyActions;
  resetAll: () => void;
}

export const useStore = create<CombinedStore>()(
  devtools(
    (set, get, store) => ({
      auth: createAuthSlice(set, get, store),
      user: createUserSlice(set, get, store),
      app: createAppSlice(set, get, store),
      journey: createJourneySlice(set, get, store),
      resetAll: () => {
        set(
          (state: CombinedStore) => ({
            auth: { ...state.auth, ...initialAuthState },
            user: { ...state.user, ...initialUserState },
            app: { ...state.app, ...initialAppState },
            journey: { ...state.journey, ...initialJourneyState },
          }),
          false,
          "global/resetAll"
        );
      },
    }),
    {
      name: "combined-store",
    }
  )
);

export {
  useIsAuthenticated,
  useAccessToken,
  useRefreshToken,
  useTokenExpiration,
  useLogin,
  useLogout,
  useSetAuthenticated,
  useSetAccessToken,
  useSetRefreshToken,
  useSetTokenExpiration,
  useClearAuth,
} from "../hooks/auth.hooks";

export {
  useUserId,
  useUserName,
  useUserEmail,
  useUserPassword,
  useUserBirthDate,
  useUserPhone,
  useUserAge,
  useUserRole,
  useSetUser,
  useSetUserName,
  useSetUserEmail,
  useSetUserPassword,
  useSetUserBirthDate,
  useSetUserPhone,
  useSetUserAge,
  useSetUserRole,
  useClearUser,
} from "../hooks/user.hooks";

export {
  useIsLoading,
  useSetLoading,
  useClearApp,
  useResetAll,
} from "../hooks/app.hooks";

export {
  useJourneyEntries,
  useCurrentJourneyEntry,
  useIsJourneyLoading,
  useAddJourneyEntry,
  useUpdateJourneyEntry,
  useDeleteJourneyEntry,
  useSetCurrentJourneyEntry,
  useLoadJourneyEntries,
  useSetJourneyLoading,
  useClearJourney,
} from "../hooks/journey.hooks";

export * from "../types";
export type { AuthState, AuthActions } from "../types/auth";
export type { UserState, UserActions } from "../types/user";
export type { AppState, AppActions } from "../types/app";
export type { JourneyState, JourneyActions } from "../types/journey";
