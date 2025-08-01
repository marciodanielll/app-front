import { apiService } from "./api";
import { AuthenticateUserResponse } from "../store/types";

export interface LoginRequest {
  email: string;
  password: string;
}

class AuthService {
  async login(data: LoginRequest): Promise<AuthenticateUserResponse> {
    return apiService.post<AuthenticateUserResponse>("/auth/login", data);
  }

  async refreshToken(refreshToken: string): Promise<AuthenticateUserResponse> {
    return apiService.post<AuthenticateUserResponse>("/auth/refresh", {
      refreshToken,
    });
  }
}

export const authService = new AuthService();
export default authService;
