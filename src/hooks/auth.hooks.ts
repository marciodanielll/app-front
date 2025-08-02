import { useStore } from "../store/store";

export const useIsAuthenticated = () =>
  useStore((state) => state.auth.isAuthenticated);
export const useAccessToken = () => useStore((state) => state.auth.accessToken);
export const useRefreshToken = () =>
  useStore((state) => state.auth.refreshToken);
export const useTokenExpiration = () =>
  useStore((state) => state.auth.accessTokenExpiresAt);
export const useLogin = () => useStore((state) => state.auth.login);
export const useLogout = () => useStore((state) => state.auth.logout);

export const useSetAuthenticated = () =>
  useStore((state) => state.auth.setAuthenticated);
export const useSetAccessToken = () =>
  useStore((state) => state.auth.setAccessToken);
export const useSetRefreshToken = () =>
  useStore((state) => state.auth.setRefreshToken);
export const useSetTokenExpiration = () =>
  useStore((state) => state.auth.setTokenExpiration);
export const useClearAuth = () => useStore((state) => state.auth.clearAuth);
