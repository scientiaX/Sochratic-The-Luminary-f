import React, { useState } from 'react';
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
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FallingStars } from '../components/ui/FallingStars';

// Mock user data
const userData = {
  username: 'alexander_wisdom',
  fullName: 'Alexander Wisdom',
  email: 'alexander.wisdom@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Passionate learner exploring the depths of programming and problem solving.',
  joinDate: 'March 2024',
  stats: {
    coursesCompleted: 12,
    totalStudyTime: 156,
    currentStreak: 23,
    totalPoints: 2847,
    rank: 'Advanced Thinker',
    level: 8,
    experience: 2847,
    nextLevelExp: 3500
  },
  achievements: [
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
  ]
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700';
      case 'rare': return 'bg-blue-100 text-blue-700';
      case 'epic': return 'bg-purple-100 text-purple-700';
      case 'legendary': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={userData.avatar} 
                alt={userData.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <Camera size={12} className="sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">{userData.fullName}</h1>
                <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">@{userData.username}</p>
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">{userData.bio}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    <span>Joined {userData.joinDate}</span>
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
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{userData.stats.coursesCompleted}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Courses Completed</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg sm:rounded-xl">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{userData.stats.totalStudyTime}h</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Total Study Time</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-lg sm:rounded-xl">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{userData.stats.currentStreak}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Day Streak</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl">
              <Award className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{userData.stats.totalPoints}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Total Points</p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Level Progress</h2>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-gray-600">Level {userData.stats.level}</p>
            <p className="text-base sm:text-lg font-semibold text-gray-900">{userData.stats.rank}</p>
          </div>
        </div>
        
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>{userData.stats.experience} XP</span>
            <span>{userData.stats.nextLevelExp} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-700"
              style={{ width: `${(userData.stats.experience / userData.stats.nextLevelExp) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600">
          {userData.stats.nextLevelExp - userData.stats.experience} XP needed for next level
        </p>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {userData.achievements.map((achievement) => (
            <div key={achievement.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl">{achievement.icon}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3">{achievement.description}</p>
              <p className="text-xs text-gray-500">Earned {achievement.earned}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Settings</h2>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Notifications</p>
                <p className="text-xs sm:text-sm text-gray-600">Manage your notification preferences</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Privacy & Security</p>
                <p className="text-xs sm:text-sm text-gray-600">Manage your account security</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">Help & Support</p>
                <p className="text-xs sm:text-sm text-gray-600">Get help and contact support</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>

          <div 
            onClick={() => navigate('/login')}
            className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-red-900 text-sm sm:text-base">Logout</p>
                <p className="text-xs sm:text-sm text-red-700">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
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
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
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
            
            {/* Tab Buttons - Horizontal Scroll on Mobile */}
            <div className="flex overflow-x-auto scrollbar-hide">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage; 