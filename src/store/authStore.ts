import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: Date | null;
}

interface AuthActions {
  setAuthenticated: (authenticated: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setTokenExpiration: (expiresAt: Date | null) => void;
  login: (accessToken: string, refreshToken: string, expiresAt: Date) => void;
  logout: () => void;
  clearAuth: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,

      setAuthenticated: (authenticated: boolean) =>
        set({ isAuthenticated: authenticated }),
      setAccessToken: (token: string | null) => set({ accessToken: token }),
      setRefreshToken: (token: string | null) => set({ refreshToken: token }),
      setTokenExpiration: (expiresAt: Date | null) =>
        set({ accessTokenExpiresAt: expiresAt }),

      login: (accessToken: string, refreshToken: string, expiresAt: Date) =>
        set({
          accessToken,
          refreshToken,
          accessTokenExpiresAt: expiresAt,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
        }),

      clearAuth: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
        }),
    }),
    {
      name: "auth-store",
    }
  )
);
