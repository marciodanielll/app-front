export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
  age: number;
  role: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
}

export interface AuthenticateUserResponse {
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
