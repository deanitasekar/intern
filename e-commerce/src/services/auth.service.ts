import { apiClient } from "@/lib/axios";
import { User, AuthResponse, LoginRequest } from "@/types/auth.type";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post(`/auth/login`, credentials);

      if (response.data.token) {
        localStorage.setItem(`auth_token`, response.data.token);
        
        const userResponse = await apiClient.get('/users/1', {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        });
        
        localStorage.setItem(`user_data`, JSON.stringify(userResponse.data));
        
        return {
          token: response.data.token,
          user: userResponse.data
        };
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(`auth_token`);
    localStorage.removeItem(`user_data`);
  }

  getToken(): string | null {
    return localStorage.getItem(`auth_token`);
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(`user_data`);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(`auth_token`);
  }

  async getUsers(limit?: number, sort?: `asc` | `desc`): Promise<User[]> {
    const params = new URLSearchParams();
    if (limit) params.append(`limit`, limit.toString());
    if (sort) params.append(`sort`, sort);

    const response = await apiClient.get(`/users?${params.toString()}`);
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData: Omit<User, `id`>): Promise<User> {
    const response = await apiClient.post(`/users`, userData);
    return response.data;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}

export const authService = AuthService.getInstance();