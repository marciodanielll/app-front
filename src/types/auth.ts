export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: Date | null;
}

export interface AuthActions {
  setAuthenticated: (authenticated: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setTokenExpiration: (expiresAt: Date | null) => void;
  login: (accessToken: string, refreshToken: string, expiresAt: Date) => void;
  logout: () => void;
  clearAuth: () => void;
}
