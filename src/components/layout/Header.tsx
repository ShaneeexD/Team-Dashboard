import { useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const dummyNotifications = [
    {
      id: '1',
      title: 'New Task Assigned',
      description: 'You have been assigned a new task: "Update documentation"',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      title: 'Meeting Reminder',
      description: 'Team standup starts in 15 minutes',
      time: '10 min ago',
      read: false,
    },
    {
      id: '3',
      title: 'Message from John',
      description: 'John commented on your task: "Looks good!"',
      time: '1 hour ago',
      read: true,
    },
  ];

  if (!user) return null;

  return (
    <header className={`${isDarkMode ? 'bg-dark-300 text-white' : 'bg-white'} shadow-sm py-4 px-6 flex items-center justify-between`}>
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className={`h-5 w-5 ${isDarkMode ? 'text-secondary-300' : 'text-secondary-400'}`} />
        </div>
        <input
          type="text"
          className={`block w-full pl-10 pr-3 py-2 border ${
            isDarkMode 
              ? 'border-dark-100 bg-dark-200 text-white placeholder-secondary-400 focus:ring-primary-600' 
              : 'border-secondary-300 bg-white placeholder-secondary-500 focus:ring-primary-500'
          } rounded-md leading-5 focus:outline-none focus:ring-2 focus:border-primary-500 sm:text-sm`}
          placeholder="Search for anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center ml-4 space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-dark-200 text-yellow-300 hover:bg-dark-100' : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'}`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>

        <div className="relative">
          <button
            className={`flex items-center ${isDarkMode ? 'text-secondary-300 hover:text-white' : 'text-secondary-500 hover:text-secondary-700'} focus:outline-none`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>

          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 ${isDarkMode ? 'bg-dark-200 border border-dark-100' : 'bg-white'} rounded-md shadow-lg overflow-hidden z-20`}>
              <div className={`p-3 ${isDarkMode ? 'border-b border-dark-100' : 'border-b border-secondary-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : ''}`}>Notifications</h3>
                  <button className="text-xs text-primary-600 hover:text-primary-400">
                    Mark all as read
                  </button>
                </div>
              </div>
              <ul className={`divide-y ${isDarkMode ? 'divide-dark-100' : 'divide-secondary-200'} max-h-96 overflow-y-auto`}>
                {dummyNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-3 transition-colors cursor-pointer ${
                      !notification.read 
                        ? isDarkMode ? 'bg-primary-900/30' : 'bg-primary-50'
                        : isDarkMode ? 'hover:bg-dark-100' : 'hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : ''}`}>{notification.title}</h4>
                      <span className={`text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>{notification.time}</span>
                    </div>
                    <p className={`text-xs ${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'} mt-1`}>
                      {notification.description}
                    </p>
                  </li>
                ))}
              </ul>
              <div className={`p-2 ${isDarkMode ? 'border-t border-dark-100' : 'border-t border-secondary-200'} text-center`}>
                <button className="text-sm text-primary-600 hover:text-primary-400">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
