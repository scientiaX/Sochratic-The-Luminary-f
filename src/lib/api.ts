// API Service for backend communication
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

export interface ApiError {
  message: string;
  status?: number;
}

// Generic API call function
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    // Log response for debugging
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: data
    });
    
    // Log detailed error information
    if (!response.ok) {
      console.log('Error Details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: data
      });
    }

    if (!response.ok) {
      // Include HTTP status code in error message for better error handling
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
      throw new Error(`${errorMessage} (Status: ${response.status})`);
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
};

// Utility function to remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};