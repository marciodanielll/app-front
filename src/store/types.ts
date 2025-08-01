export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  age: number;
  role: string;
}

export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
}

export interface AppState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

export interface AuthenticateUserResponseDTO {
  user?: {
    id: string;
    email: string;
    age: number;
    name: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
}
