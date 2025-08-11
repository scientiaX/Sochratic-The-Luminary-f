// API Service for backend communication
import axios, { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Types for API requests and responses
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface AuthResponse {
  success?: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
    name: string;
    age: number;
  };
}

export interface ProfileData {
  id: number;
  name: string;
  username: string;
  age: number;
  email: string;
  createdAt: {
    month: number;
    year: number;
  };
  intelligenceProgress?: Array<{
    type: string;
    exp: number;
    level: number;
  }>;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Generic API call function
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    let data;
    try {
      const responseText = await response.text();
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Failed to parse response as JSON: ${parseError}`);
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred');
  }
};

// Auth API functions
export const authAPI = {
  // Health check
  healthCheck: () => apiCall<{ status: string }>('/'),

  // Login
  login: (credentials: LoginRequest) =>
    apiCall<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Register
  register: (userData: RegisterRequest) =>
    apiCall<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Get Profile
  getProfile: async (): Promise<ProfileData> => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      const result = await apiCall<{ success: boolean; data: ProfileData }>('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!result.success) {
        throw new Error('Failed to fetch profile data');
      }
      
      if (!result.data) {
        throw new Error('Profile data is missing from response');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error in getProfile:', error);
      throw error;
    }
  },
};

// Topic API functions
export const topicAPI = {
  getTopics: () => apiCall<any[]>('/api/topic'),
};

// Chat API functions
export const chatAPI = {
  sendMessage: (message: string) =>
    apiCall<any>('/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  getHistory: () => apiCall<any[]>('/api/chat/history'),
};

// Session API functions
export const sessionAPI = {
  createSession: (sessionData: any) =>
    apiCall<any>('/api/session/create', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    }),

  getSession: (id: string) => apiCall<any>(`/api/session/${id}`),
};

// Experience API functions
export const expAPI = {
  getUserExp: () => apiCall<any>('/api/exp/user'),

  addExp: (expData: any) =>
    apiCall<any>('/api/exp/add', {
      method: 'POST',
      body: JSON.stringify(expData),
    }),
};

// Utility function to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Utility function to set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('token', token);
  localStorage.setItem('auth_token', token);
};

// Utility function to remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('auth_token');
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

//api configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching issues
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic and error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    // Handle network errors with retry logic
    if (
      error.code === 'NETWORK_ERROR' ||
      error.code === 'ECONNABORTED' ||
      (error.response?.status && error.response.status >= 500)
    ) {
      if (!originalRequest._retry && (!originalRequest._retryCount || originalRequest._retryCount < API_CONFIG.retryAttempts)) {
        originalRequest._retry = true;
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        // Exponential backoff
        const delay = API_CONFIG.retryDelay * Math.pow(2, originalRequest._retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));

        return api(originalRequest);
      }
    }

    // Handle 401 Unauthorized - clear auth and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      const message = (error.response.data as { message?: string })?.message || 'Insufficient permissions';
      console.warn('Access denied:', message);
    }

    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error handling utility
export const handleApiError = (error: unknown): string => {
  const axiosError = error as AxiosError;
  const responseData = axiosError.response?.data as { message?: string; errors?: string[] };
  
  if (responseData?.message) {
    return responseData.message;
  }
  if (responseData?.errors && Array.isArray(responseData.errors)) {
    return responseData.errors.join(', ');
  }
  if (axiosError.message) {
    return axiosError.message;
  }
  return 'An unexpected error occurred';
};

// Health check function
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch {
    return false;
  }
};


export default api;

