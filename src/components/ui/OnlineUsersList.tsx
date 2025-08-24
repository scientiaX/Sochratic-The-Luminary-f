import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface OnlineUser {
  id: number;
  name: string;
  username: string;
  profilePhoto?: string;
}

const OnlineUsersList: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/profile/online-users');
        const data = await response.json();
        
        if (data.success) {
          setOnlineUsers(data.data);
        } else {
          setError('Failed to fetch online users');
        }
      } catch (error) {
        setError('Failed to fetch online users');
        console.error('Error fetching online users:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchOnlineUsers();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOnlineUsers, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-gray-900">Online Users</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h3 className="font-semibold text-gray-900">Online Users</h3>
        </div>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="font-semibold text-gray-900">Online Users</h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {onlineUsers.length}
        </span>
      </div>
      
      {onlineUsers.length === 0 ? (
        <p className="text-gray-500 text-sm">No users online</p>
      ) : (
        <div className="space-y-3">
          {onlineUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="relative">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {user.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineUsersList;
