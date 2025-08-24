import React, { useState, useEffect } from 'react';
import { authAPI } from '../../lib/api';

interface OnlineStatusIndicatorProps {
  userId: number;
  initialStatus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const OnlineStatusIndicator: React.FC<OnlineStatusIndicatorProps> = ({
  userId,
  initialStatus = false,
  size = 'md',
  showText = false
}) => {
  const [isOnline, setIsOnline] = useState(initialStatus);
  const [lastSeen, setLastSeen] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await authAPI.getUserStatus();
        setIsOnline(status.status === 'online');
        setLastSeen(status.lastSeen);
      } catch (error) {
        console.error('Failed to fetch user status:', error);
      }
    };

    // Fetch initial status
    fetchStatus();

    // Poll for status updates every 10 seconds
    const interval = setInterval(fetchStatus, 10000);

    return () => clearInterval(interval);
  }, [userId]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-3 h-3';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-4 h-4';
    }
  };

  const getStatusText = () => {
    if (isOnline) return 'Online';
    if (lastSeen) {
      const lastSeenDate = new Date(lastSeen);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
    return 'Offline';
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${getSizeClasses()}`}>
        <div 
          className={`w-full h-full rounded-full border-2 border-white shadow-lg ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          } flex items-center justify-center`}
        >
          <div className={`w-1/2 h-1/2 rounded-full bg-white ${
            isOnline ? 'animate-pulse' : ''
          }`}></div>
        </div>
        {isOnline && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        )}
      </div>
      {showText && (
        <span className={`text-xs font-medium ${
          isOnline ? 'text-green-600' : 'text-gray-500'
        }`}>
          {getStatusText()}
        </span>
      )}
    </div>
  );
};

export default OnlineStatusIndicator;
