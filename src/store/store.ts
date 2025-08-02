import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
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
    persist(
      (set, get, store) => ({
        auth: createAuthSlice(set, get, store),
        user: createUserSlice(set, get, store),
        app: createAppSlice(set, get, store),
        journey: createJourneySlice(set, get, store),
        resetAll: () => {
          localStorage.removeItem("tcc-app-storage");
          set(
            () => ({
              auth: {
                ...initialAuthState,
                setAuthenticated: get().auth.setAuthenticated,
                setAccessToken: get().auth.setAccessToken,
                setRefreshToken: get().auth.setRefreshToken,
                setTokenExpiration: get().auth.setTokenExpiration,
                login: get().auth.login,
                logout: get().auth.logout,
                clearAuth: get().auth.clearAuth,
              },
              user: {
                ...initialUserState,
                setUser: get().user.setUser,
                setName: get().user.setName,
                setEmail: get().user.setEmail,
                setPassword: get().user.setPassword,
                setBirthDate: get().user.setBirthDate,
                setPhone: get().user.setPhone,
                setAge: get().user.setAge,
                setRole: get().user.setRole,
                clearUser: get().user.clearUser,
              },
              app: {
                ...initialAppState,
                setLoading: get().app.setLoading,
                clearApp: get().app.clearApp,
              },
              journey: {
                ...initialJourneyState,
                addEntry: get().journey.addEntry,
                updateEntry: get().journey.updateEntry,
                deleteEntry: get().journey.deleteEntry,
                setCurrentEntry: get().journey.setCurrentEntry,
                loadEntries: get().journey.loadEntries,
                setJourneyLoading: get().journey.setJourneyLoading,
                clearJourney: get().journey.clearJourney,
              },
            }),
            false,
            "global/resetAll"
          );
        },
      }),
      {
        name: "tcc-app-storage",
        partialize: (state) => ({
          auth: {
            isAuthenticated: state.auth.isAuthenticated,
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken,
            accessTokenExpiresAt: state.auth.accessTokenExpiresAt,
          },
          user: {
            id: state.user.id,
            name: state.user.name,
            email: state.user.email,
            birthDate: state.user.birthDate,
            phone: state.user.phone,
            age: state.user.age,
            role: state.user.role,
          },
          journey: {
            entries: state.journey.entries,
            currentEntry: state.journey.currentEntry,
          },
        }),
      }
    ),
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
