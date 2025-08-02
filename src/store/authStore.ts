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
        set({ isAuthenticated: authenticated }, false, "auth/setAuthenticated"),
      setAccessToken: (token: string | null) => 
        set({ accessToken: token }, false, "auth/setAccessToken"),
      setRefreshToken: (token: string | null) => 
        set({ refreshToken: token }, false, "auth/setRefreshToken"),
      setTokenExpiration: (expiresAt: Date | null) =>
        set({ accessTokenExpiresAt: expiresAt }, false, "auth/setTokenExpiration"),

      login: (accessToken: string, refreshToken: string, expiresAt: Date) =>
        set({
          accessToken,
          refreshToken,
          accessTokenExpiresAt: expiresAt,
          isAuthenticated: true,
        }, false, "auth/login"),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
        }, false, "auth/logout"),

      clearAuth: () =>
        set({
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
        }, false, "auth/clearAuth"),
    }),
    {
      name: "auth-store",
    }
  )
);
