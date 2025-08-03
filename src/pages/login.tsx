import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import atomImg from '../assets/icon/atom.png';
import { FallingStars } from '../components/ui/FallingStars';
import { authAPI, setAuthToken } from '../lib/api';
import type { AuthResponse } from '../lib/api';

// Define types for form and errors
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  age?: string;
}

export default function LoginRegisterPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For username, remove spaces automatically
    let processedValue = value;
    if (name === 'username') {
      processedValue = value.replace(/\s/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
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
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (/\s/.test(formData.username)) {
      newErrors.username = 'Username cannot contain spaces';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!isLogin) {
      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Full name must be at least 2 characters';
      }
      
      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      
      // Age validation - increase minimum age to 4
      if (!formData.age.trim()) {
        newErrors.age = 'Age is required';
      } else if (isNaN(Number(formData.age)) || parseInt(formData.age) < 4 || parseInt(formData.age) > 120) {
        newErrors.age = 'Age must be a number between 4-120';
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError('');
    
         try {
       if (isLogin) {
         // Login
         const loginData = {
           username: formData.username,
           password: formData.password,
         };
         console.log('Sending login data:', loginData);
         
         const response: AuthResponse = await authAPI.login(loginData);
         
         // Handle both old and new response formats
         if (response.success && response.token) {
           setAuthToken(response.token);
           navigate('/selection');
         } else if (response.message && response.user) {
           // New backend response format - successful login
           setAuthToken('dummy-token'); // Backend doesn't return token yet
           navigate('/selection');
         } else {
           setApiError(response.message || 'Login failed');
         }
       } else {
                   // Register
          const registerData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name: formData.name,
            age: parseInt(formData.age),
          };
         console.log('Sending register data:', registerData);
         
         const response: AuthResponse = await authAPI.register(registerData);
         
         // Handle both old and new response formats
         if (response.success && response.token) {
           setAuthToken(response.token);
           navigate('/selection');
         } else if (response.message && response.user) {
           // New backend response format - successful registration
           setAuthToken('dummy-token'); // Backend doesn't return token yet
           navigate('/selection');
         } else {
           setApiError(response.message || 'Registration failed');
         }
       }
    } catch (error) {
      console.error('Auth error:', error);
      
             // Handle specific error cases
       if (error instanceof Error) {
         if (error.message.includes('400') || error.message.includes('Bad Request')) {
           if (isLogin) {
             setApiError('Invalid username or password. Please check your credentials.');
           } else {
             setApiError('Registration failed. Please check all required fields: username, email, full name, password, and age.');
           }
         } else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
           if (isLogin) {
             setApiError('User not found. Please register first or check your credentials.');
           } else {
             setApiError('Registration failed. Please try again or contact support.');
           }
         } else if (error.message.includes('404')) {
           setApiError('Service not available. Please try again later.');
         } else if (error.message.includes('Network') || error.message.includes('fetch')) {
           setApiError('Network error. Please check your connection and try again.');
         } else {
           setApiError(error.message);
         }
       } else {
         setApiError('An unexpected error occurred. Please try again.');
       }
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
      name: '',
      age: ''
    });
    setErrors({});
    setApiError('');
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
                         {/* Name Field (Register only) */}
             {!isLogin && (
               <div className="space-y-1.5">
                 <label className="block text-blue-200 text-sm font-medium">
                   Full Name
                 </label>
                 <div className="relative">
                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                   <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     className="w-full pl-10 pr-3 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                     placeholder="Enter your full name"
                   />
                 </div>
                 {errors.name && (
                   <p className="text-pink-400 text-sm">{errors.name}</p>
                 )}
               </div>
             )}
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
                     min="16"
                     max="120"
                     className="w-full pl-10 pr-3 py-2 sm:py-3 bg-transparent border border-blue-200 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                     placeholder="Enter your age (min 4)"
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
            {/* API Error Display */}
            {apiError && (
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
                <p className="text-red-300 text-sm text-center">{apiError}</p>
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