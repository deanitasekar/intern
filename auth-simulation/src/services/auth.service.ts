import { AuthRequest, AuthResponse, LogoutResult, RegisterRequest, RegisterResponse, User } from "@/types/auth.type";
import { ResponseDTO } from "@/types/global.type";

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Simulate login API call
   */
  async login(data: AuthRequest): Promise<ResponseDTO<AuthResponse>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.username === "user" && data.password === "pass") {
          const response: ResponseDTO<AuthResponse> = {
            data: {
              id: "1",
              username: data.username,
              email: "user@example.com",
              name: "Mantap",
              accessToken: "dummy-auth-token-12345",
              refreshToken: "dummy-refresh-token-67890",
              role: "admin",
              permissions: ["read", "write", "delete"],
            },
            code: 200,
            message: "Login successful",
            timestamp: Date.now(),
            success: true,
          };
          resolve(response);
          return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem("users") || "{}");
        const user = Object.values(registeredUsers).find(
          (user: any) => user.username === data.username && user.password === data.password
        ) as User;

        if (user) {
          const response: ResponseDTO<AuthResponse> = {
            data: {
              id: user.id,
              username: user.username,
              email: user.email || "",
              name: user.name || "",
              accessToken: user.accessToken || "",
              refreshToken: user.refreshToken || "",
              role: user.role || "user",
              permissions: user.permissions || ["read"],
            },
            code: 200,
            message: "Login successful",
            timestamp: Date.now(),
            success: true,
          };
          resolve(response);
        } else {
          reject({
            message: "Invalid username or password",
            code: 401,
            details: "Authentication failed",
          });
        }
      }, 1000);
    });
  }

  async register(data: RegisterRequest): Promise<ResponseDTO<RegisterResponse>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");

        const userExists = Object.values(existingUsers).some((user: any) => 
          user.username === data.username || user.email === data.email
        );

        if (userExists) {
          reject({
            message: "Username or email already exists",
            code: 409,
            details: "User with this username or email already registered",
          });
          return;
        }

        const newUser: User & { password: string } = {
          id: Date.now().toString(),
          username: data.username,
          email: data.email,
          name: data.username,
          role: 'user',
          permissions: ['read'],
          accessToken: "dummy-auth-token-" + Date.now(),
          refreshToken: "dummy-refresh-token-" + Date.now(),
          password: data.password,
        };

        existingUsers[newUser.id] = newUser;
        localStorage.setItem("users", JSON.stringify(existingUsers));

        const response: ResponseDTO<RegisterResponse> = {
          data: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email || "",
            name: newUser.name || "",
            accessToken: newUser.accessToken || "",
            refreshToken: newUser.refreshToken || "",
            role: newUser.role || "user",
            permissions: newUser.permissions || ["read"],
          },
          code: 201,
          message: "Registration successful",
          timestamp: Date.now(),
          success: true,
        };
        resolve(response);
      }, 1000);
    });
  }

  /**
   * Simulate logout API call
   */
  async logout(): Promise<ResponseDTO<LogoutResult>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response: ResponseDTO<LogoutResult> = {
          data: {
            success: true,
            message: "Logout successful",
          },
          code: 200,
          message: "Successfully logged out",
          timestamp: Date.now(),
          success: true,
        };
        resolve(response);
      }, 500);
    });
  }

  /**
   * Simulate get current user API call
   */
  async me(): Promise<ResponseDTO<AuthResponse>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem("auth_token");
        console.log("Token:", token);
        if (token) {
          const registeredUsers = JSON.parse(localStorage.getItem("users") || "{}");
          const user = Object.values(registeredUsers).find((user: any) => 
            user.accessToken === token
          ) as User;

          console.log("User:", user);

          if (user) {
            const response: ResponseDTO<AuthResponse> = {
              data: {
                id: user.id,
                username: user.username,
                email: user.email || "",
                name: user.name || "",
                accessToken: token,
                role: user.role || "user",
                permissions: user.permissions || ["read"],
              },
              code: 200,
              message: "User data retrieved successfully",
              timestamp: Date.now(),
              success: true,
            };
            resolve(response);
          } else {
            const response: ResponseDTO<AuthResponse> = {
              data: {
                id: "1",
                username: "user",
                email: "user@example.com",
                name: "Mantap",
                accessToken: token,
                role: "admin",
                permissions: ["read", "write", "delete"],
              },
              code: 200,
              message: "User data retrieved successfully",
              timestamp: Date.now(),
              success: true,
            };
            resolve(response);
          }
        } else {
          reject({
            message: "Unauthorized",
            code: 401,
            details: "No valid token found",
          });
        }
      }, 1000);
    });
  }

  /**
   * Simulate refresh token API call
   */
  async refreshToken(): Promise<
    ResponseDTO<Pick<AuthResponse, "accessToken" | "refreshToken">>
  > {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response: ResponseDTO<
            Pick<AuthResponse, "accessToken" | "refreshToken">
          > = {
            data: {
              accessToken: "new-dummy-auth-token-" + Date.now(),
              refreshToken: "new-dummy-refresh-token-" + Date.now(),
            },
            code: 200,
            message: "Token refreshed successfully",
            timestamp: Date.now(),
            success: true,
          };
          resolve(response);
        } else {
          reject({
            message: "Invalid refresh token",
            code: 401,
            details: "Refresh token expired or invalid",
          });
        }
      }, 500);
    });
  }
}

export default AuthService.getInstance();