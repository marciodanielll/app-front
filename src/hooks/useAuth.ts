import { useAuthStore } from "../store/authStore";

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAccessToken = () => useAuthStore((state) => state.accessToken);
export const useRefreshToken = () =>
  useAuthStore((state) => state.refreshToken);
export const useTokenExpiration = () =>
  useAuthStore((state) => state.accessTokenExpiresAt);

export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
    setAuthenticated: state.setAuthenticated,
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
    setTokenExpiration: state.setTokenExpiration,
    clearAuth: state.clearAuth,
  }));
