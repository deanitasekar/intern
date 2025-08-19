import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    
    const loginEndpoint = config.url?.includes("/auth");
    if (!loginEndpoint) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added token to request:', token);
      } else {
        console.log('No token found for non-login request');
      }
    } else {
      console.log('Login endpoint - no token needed');
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url);
    console.error('Error data:', error.response?.data);
    
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/auth")
    ) {
      console.log('401 error - clearing tokens and redirecting to login');
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);