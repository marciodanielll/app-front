import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import environment from "../config/environment";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: environment.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.api.interceptors.request.use(
      (config) => {
        console.log(
          `🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        console.error("❌ Request error:", error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        console.log(
          `✅ API Response: ${response.status} ${response.config.url}`
        );
        return response;
      },
      (error) => {
        console.error(
          "❌ Response error:",
          error.response?.data || error.message
        );
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.request(config);
    return response.data;
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.request<T>({
      method: "GET",
      url: endpoint,
      ...config,
    });
    return response;
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.request<T>({
      method: "POST",
      url: endpoint,
      data,
      ...config,
    });
    return response;
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.request<T>({
      method: "PUT",
      url: endpoint,
      data,
      ...config,
    });
    return response;
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.request<T>({
      method: "DELETE",
      url: endpoint,
      ...config,
    });
    return response;
  }

  async authorizedRequest<T>(
    endpoint: string,
    config: AxiosRequestConfig = {},
    token?: string
  ): Promise<T> {
    const authConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    const response = await this.request<T>({
      url: endpoint,
      ...authConfig,
    });
    return response;
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common["Authorization"];
    }
  }

  getInstance(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
export default apiService;
