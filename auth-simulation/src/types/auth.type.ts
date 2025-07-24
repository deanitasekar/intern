export interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  role?: string;
  permissions?: string[];
  accessToken?: string;
  refreshToken?: string;
}

export interface RegisteredUsers {
  [key: string]: User;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  email?: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  role: string;
  permissions: string[];
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  role: string;
  permissions: string[];
}

export interface LoginResult {
  success: boolean;
  data: AuthResponse;
  message: string;
}

export interface LogoutResult {
  success: boolean;
  message: string;
}
