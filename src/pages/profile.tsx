import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Trophy, 
  BookOpen, 
  Clock, 
  Target, 
  Star, 
  Edit, 
  Camera, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Award,
  Brain,
  Zap,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Globe,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FallingStars } from '../components/ui/FallingStars';
import { authAPI } from '../lib/api';
import type { ProfileData } from '../lib/api';

// Mock user data for stats and achievements (keeping these as they might not be in the profile API yet)
const mockStats = {
  coursesCompleted: 12,
  totalStudyTime: 156,
  currentStreak: 23,
  totalPoints: 2847,
  rank: 'Advanced Thinker',
  level: 8,
  experience: 2847,
  nextLevelExp: 3500
};

const mockAchievements = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Completed your first course',
    icon: '🎯',
    earned: '2024-03-15',
    rarity: 'common'
  },
  {
    id: 2,
    title: 'Streak Master',
    description: 'Maintained a 7-day study streak',
    icon: '🔥',
    earned: '2024-03-20',
    rarity: 'rare'
  },
  {
    id: 3,
    title: 'Problem Solver',
    description: 'Solved 50 programming problems',
    icon: '🧠',
    earned: '2024-04-01',
    rarity: 'epic'
  }
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found. Please login first.');
        }
        
        const data = await authAPI.getProfile();
        setProfileData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err instanceof Error && err.message.includes('authentication')) {
          setError('Please login to view your profile');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
        
        // Fallback to mock data if API fails
        setProfileData({
          id: 1,
          name: 'Demo User',
          username: 'demo_user',
          age: 25,
          email: 'demo@example.com',
          createdAt: { month: 8, year: 2024 },
          intelligenceProgress: [
            { type: 'mathematics', exp: 150, level: 3 },
            { type: 'science', exp: 200, level: 4 },
            { type: 'language', exp: 100, level: 2 }
          ]
        });
        setError('Backend connection failed. Showing demo data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700';
      case 'rare': return 'bg-blue-100 text-blue-700';
      case 'epic': return 'bg-purple-100 text-purple-700';
      case 'legendary': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Helper function to format date
  const formatJoinDate = (createdAt: { month: number; year: number }) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[createdAt.month - 1]} ${createdAt.year}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Profile</h2>
          <p className="text-gray-600">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  // Show demo data notification if there's an error but we have profile data
  const showDemoNotification = error && error.includes('Backend connection failed') && profileData;

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If no profile data, show error
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No profile data available</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
            <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <Camera size={12} className="sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">{profileData.name}</h1>
                <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">@{profileData.username}</p>
                <p className="text-gray-700 mb-2 text-sm sm:text-base">{profileData.email}</p>
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">Passionate learner exploring the depths of programming and problem solving.</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    <span>Joined {profileData.createdAt ? formatJoinDate(profileData.createdAt) : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} className="sm:w-4 sm:h-4" />
                    <span>{profileData.age} years old</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg text-sm sm:text-base whitespace-nowrap"
              >
                <Edit size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl">
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{mockStats.coursesCompleted}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Courses Completed</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{mockStats.totalStudyTime}h</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Total Study Time</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg sm:rounded-xl">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{mockStats.currentStreak}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Current Streak</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg sm:rounded-xl">
              <Star className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{mockStats.totalPoints}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Total Points</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{mockStats.rank}</h3>
              <p className="text-gray-600 text-sm">Level {mockStats.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{mockStats.experience}</p>
            <p className="text-gray-600 text-sm">Experience Points</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Level {mockStats.level}</span>
            <span>Level {mockStats.level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${(mockStats.experience / mockStats.nextLevelExp) * 100}%` 
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            {mockStats.nextLevelExp - mockStats.experience} XP needed for next level
          </p>
        </div>
      </div>

      {/* Intelligence Progress - if available from backend */}
      {profileData.intelligenceProgress && profileData.intelligenceProgress.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Intelligence Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {profileData.intelligenceProgress.map((progress, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl">
                    <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase">{progress.type}</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">Level {progress.level}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{progress.exp} XP</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Achievements</h2>
        <div className="grid gap-4">
          {mockAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
                <p className="text-gray-500 text-xs mt-1">Earned {achievement.earned}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-4 h-4 w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Profile Information</p>
                <p className="text-xs sm:text-sm text-gray-600">Update your personal details</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 w-5 h-5 text-gray-400" />
          </div>

          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="w-4 h-4 w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Notifications</p>
                <p className="text-xs sm:text-sm text-gray-600">Manage your notification preferences</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 w-5 h-5 text-gray-400" />
          </div>

          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-4 h-4 w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Privacy & Security</p>
                <p className="text-xs sm:text-sm text-gray-600">Control your privacy settings</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 w-5 h-5 text-gray-400" />
          </div>

          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <HelpCircle className="w-4 h-4 w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Help & Support</p>
                <p className="text-xs sm:text-sm text-gray-600">Get help and contact support</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 w-5 h-5 text-gray-400" />
          </div>

          <div 
            onClick={() => navigate('/login')}
            className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <LogOut className="w-4 h-4 w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-red-900 text-sm sm:text-base">Logout</p>
                <p className="text-xs sm:text-sm text-red-700">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'achievements':
        return renderAchievements();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Falling Stars Background */}
      <FallingStars starCount={15} starColor="#3B82F6" />
      
      {/* Demo Data Notification */}
      {showDemoNotification && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Demo Mode:</strong> Backend connection failed. Showing sample data for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
            <button 
              onClick={() => navigate('/selection')}
              className="flex items-center space-x-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-600 hover:from-gray-800 hover:via-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer text-sm"
            >
              <BookOpen size={16} className="text-gray-300" />
              <span className="font-medium hidden sm:inline">Back to Learning</span>
              <span className="font-medium sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-gray-600">@{profileData.username}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Member since</p>
              <p className="text-lg font-semibold text-gray-900">{formatJoinDate(profileData.createdAt)}</p>
              <p className="text-sm text-gray-500">Age: {profileData.age}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {profileData.email}
            </span>
          </div>
        </div>

        {/* Tab Buttons - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto scrollbar-hide mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner min-w-max">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 