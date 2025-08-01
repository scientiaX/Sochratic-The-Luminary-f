import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Calendar, Wifi, WifiOff } from 'lucide-react';
import atomImg from '../assets/icon/atom.png';
import { FallingStars } from '../components/ui/FallingStars';
import api, { handleApiError, checkApiHealth } from '../lib/api';

// Define types for form and errors
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
}

export default function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [serverMessage, setServerMessage] = useState<string>('');

  // Check backend connection on component mount
  useEffect(() => {
    checkConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const isHealthy = await checkApiHealth();
      setConnectionStatus(isHealthy ? 'online' : 'offline');
      if (isHealthy) {
        setServerMessage('Connected to server');
      } else {
        setServerMessage('Server unavailable');
      }
    } catch {
      setConnectionStatus('offline');
      setServerMessage('Connection failed');
    }
  };

  // Test functions for backend connection
  const testRegister = async () => {
    if (connectionStatus === 'offline') {
      setServerMessage('Cannot test - server offline');
      return;
    }

    try {
      setServerMessage('Testing registration...');
      const response = await api.post('/auth/register', {
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@example.com', 
        password: 'password123',
        name: 'Test User',
        age: 25
      });
      console.log('Register:', response.data);
      setServerMessage('✅ Registration test successful');
    } catch (error) {
      console.error('Register error:', error);
      setServerMessage('❌ Registration test failed: ' + handleApiError(error));
    }
  };

  const testLogin = async () => {
    if (connectionStatus === 'offline') {
      setServerMessage('Cannot test - server offline');
      return;
    }

    try {
      setServerMessage('Testing login...');
      const response = await api.post('/auth/login', {
        username: 'testuser',
        password: 'password123'
      });
      console.log('Login:', response.data);
      setServerMessage('✅ Login test successful');
    } catch (error) {
      console.error('Login error:', error);
      setServerMessage('❌ Login test failed: ' + handleApiError(error));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.age.trim()) {
        newErrors.age = 'Age is required';
      } else if (isNaN(Number(formData.age)) || parseInt(formData.age) < 13 || parseInt(formData.age) > 120) {
        newErrors.age = 'Age must be a number between 13-120';
      }
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    // Check connection before attempting submission
    if (connectionStatus === 'offline') {
      setErrors({ password: 'Server is offline. Please try again later.' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      if (isLogin) {
        // Login request
        const response = await api.post('/auth/login', {
          username: formData.username,
          password: formData.password
        });
        
        // Store user info and token if available
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        if (response.data.token) {
          localStorage.setItem('auth_token', response.data.token);
        }
        
        setServerMessage('✅ Login successful! Redirecting...');
        
        // Redirect to selection page
        setTimeout(() => {
          window.location.href = '/selection';
        }, 1000);
      } else {
        // Register request
        const response = await api.post('/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.username,
          age: parseInt(formData.age)
        });
        
        // Store user info and token if available
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        if (response.data.token) {
          localStorage.setItem('auth_token', response.data.token);
        }
        
        setServerMessage('✅ Registration successful! Redirecting...');
        
        // Redirect to selection page
        setTimeout(() => {
          window.location.href = '/selection';
        }, 1000);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      const errorMessage = handleApiError(error);
      
      // Show appropriate error message
      if (errorMessage.toLowerCase().includes('username') || errorMessage.toLowerCase().includes('password')) {
        setErrors({ password: errorMessage });
      } else if (errorMessage.toLowerCase().includes('email')) {
        setErrors({ email: errorMessage });
      } else {
        setErrors({ password: errorMessage });
      }
      
      setServerMessage('❌ ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      {/* Falling Stars Background */}
      <FallingStars starCount={40} />
      {/* Main Card with glassmorphism, more transparent, no neon */}
      <div className="relative w-full max-w-xs sm:max-w-md z-10">
        <div
          className="backdrop-blur-2xl bg-white/5 border border-blue-200 rounded-3xl p-4 sm:p-8 shadow-lg"
          style={{
            border: '1px solid #a5b4fc', // subtle blue border
            background: 'rgba(255,255,255,0.08)', // more transparent
            boxShadow: '0 4px 32px 0 rgba(30,64,175,0.10)', // soft shadow
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3">
              <img
                src={atomImg}
                alt="Atom Logo"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain rounded-full shadow-md border border-blue-200 bg-white/20"
                style={{ boxShadow: '0 2px 16px 0 rgba(30,64,175,0.15)' }}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
              {isLogin ? 'Welcome Back' : 'Create a New Account'}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              {isLogin ? 'Sign in to your account' : 'Register to get started'}
            </p>
            
            {/* Connection Status */}
            <div className="flex items-center justify-center gap-2 mt-3 mb-2">
              {connectionStatus === 'checking' && (
                <div className="flex items-center gap-2 text-yellow-300 text-xs">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span>Checking connection...</span>
                </div>
              )}
              {connectionStatus === 'online' && (
                <div className="flex items-center gap-2 text-green-300 text-xs">
                  <Wifi className="w-3 h-3" />
                  <span>Server online</span>
                </div>
              )}
              {connectionStatus === 'offline' && (
                <div className="flex items-center gap-2 text-red-300 text-xs">
                  <WifiOff className="w-3 h-3" />
                  <span>Server offline</span>
                </div>
              )}
            </div>
            
            {/* Server Message */}
            {serverMessage && (
              <div className="text-xs text-blue-200 bg-blue-900/20 rounded-lg px-3 py-2 mt-2">
                {serverMessage}
              </div>
            )}
          </div>
          {/* Form */}
          <div className="space-y-4">
            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="block text-blue-200 text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="text-pink-400 text-sm">{errors.username}</p>
              )}
            </div>
            {/* Email Field (Register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-blue-200 text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-pink-400 text-sm">{errors.email}</p>
                )}
              </div>
            )}
            {/* Age Field (Register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-blue-200 text-sm font-medium">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="13"
                    max="120"
                    className="w-full pl-10 pr-3 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your age"
                  />
                </div>
                {errors.age && (
                  <p className="text-pink-400 text-sm">{errors.age}</p>
                )}
              </div>
            )}
            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-blue-200 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-pink-400 text-sm">{errors.password}</p>
              )}
            </div>
            {/* Confirm Password Field (Register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-blue-200 text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-10 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-pink-400 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-blue-300 rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Register'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          {/* Test Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={testRegister}
              className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              Test Register
            </button>
            <button
              type="button"
              onClick={testLogin}
              className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-orange-600 transition-colors"
            >
              Test Login
            </button>
          </div>

          {/* Switch Mode */}
          <div className="mt-4 text-center">
            <p className="text-blue-200 mb-2">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              type="button"
              onClick={switchMode}
              className="text-blue-300 hover:text-pink-400 font-medium transition-colors duration-200"
            >
              {isLogin ? 'Register now' : 'Sign in here'}
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="text-center mt-8 text-blue-300 text-sm">
          <p>© 2025 NovaX. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}