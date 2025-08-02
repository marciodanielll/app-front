import { StateCreator } from "zustand";
import { AuthState, AuthActions } from "../../types/auth";
import { UserState, UserActions } from "../../types/user";
import { AppState, AppActions } from "../../types/app";

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiresAt: null,
};

interface CombinedStore {
  auth: AuthState & AuthActions;
  user: UserState & UserActions;
  app: AppState & AppActions;
  resetAll: () => void;
}

export const createAuthSlice: StateCreator<
  CombinedStore,
  [["zustand/devtools", never]],
  [],
  AuthState & AuthActions
> = (set) => ({
  ...initialAuthState,

  setAuthenticated: (authenticated: boolean) =>
    set(
      (state: CombinedStore) => ({
        auth: { ...state.auth, isAuthenticated: authenticated },
      }),
      false,
      "auth/setAuthenticated"
    ),

  setAccessToken: (token: string | null) =>
    set(
      (state: CombinedStore) => ({
        auth: { ...state.auth, accessToken: token },
      }),
      false,
      "auth/setAccessToken"
    ),

  setRefreshToken: (token: string | null) =>
    set(
      (state: CombinedStore) => ({
        auth: { ...state.auth, refreshToken: token },
      }),
      false,
      "auth/setRefreshToken"
    ),

  setTokenExpiration: (expiresAt: Date | null) =>
    set(
      (state: CombinedStore) => ({
        auth: { ...state.auth, accessTokenExpiresAt: expiresAt },
      }),
      false,
      "auth/setTokenExpiration"
    ),

  login: (accessToken: string, refreshToken: string, expiresAt: Date) =>
    set(
      (state: CombinedStore) => ({
        auth: {
          ...state.auth,
          accessToken,
          refreshToken,
          accessTokenExpiresAt: expiresAt,
          isAuthenticated: true,
        },
      }),
      false,
      "auth/login"
    ),

  logout: () =>
    set(
      (state: CombinedStore) => ({
        auth: {
          ...state.auth,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
        },
      }),
      false,
      "auth/logout"
    ),

  clearAuth: () =>
    set(
      (state: CombinedStore) => ({
        auth: { ...state.auth, ...initialAuthState },
      }),
      false,
      "auth/clearAuth"
    ),
});
