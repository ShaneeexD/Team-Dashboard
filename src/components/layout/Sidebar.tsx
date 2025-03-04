import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { useTheme } from '../../contexts/ThemeContext';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuthStore();
  const { isDarkMode } = useTheme();

  if (!user) return null;

  const navigationItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/' },
    { name: 'Chat', icon: ChatBubbleLeftRightIcon, path: '/chat' },
    { name: 'Tasks', icon: ClipboardDocumentListIcon, path: '/tasks' },
    { name: 'Calendar', icon: CalendarIcon, path: '/calendar' },
    { name: 'Team', icon: UsersIcon, path: '/team' },
    { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`${isDarkMode ? 'bg-dark-200' : 'bg-secondary-800'} text-white h-screen transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      } flex flex-col fixed left-0 top-0 z-10`}
    >
      <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-dark-100' : 'border-secondary-700'}`}>
        {expanded ? (
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : ''}`}>Team Dashboard</h1>
        ) : (
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : ''}`}>TD</h1>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`${isDarkMode ? 'text-secondary-300 hover:text-white' : 'text-secondary-400 hover:text-white'}`}
        >
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-2 rounded-md transition-colors ${
                isActive
                  ? isDarkMode 
                    ? 'bg-primary-900 text-white' 
                    : 'bg-primary-700 text-white'
                  : isDarkMode
                    ? 'text-secondary-300 hover:bg-dark-100 hover:text-white'
                    : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              {expanded && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t ${isDarkMode ? 'border-dark-100' : 'border-secondary-700'}`}>
        <div className="flex items-center">
          <img
            src={user.photoURL || 'https://via.placeholder.com/40'}
            alt={user.displayName || 'User'}
            className="w-10 h-10 rounded-full"
          />
          {expanded && (
            <div className="ml-3">
              <p className="font-medium">{user.displayName}</p>
              <p className={`text-xs ${isDarkMode ? 'text-secondary-300' : 'text-secondary-400'}`}>{user.email}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className={`w-full mt-4 flex items-center p-2 rounded-md transition-colors ${
            isDarkMode
              ? 'text-secondary-300 hover:bg-dark-100 hover:text-white'
              : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
          }`}
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6 flex-shrink-0" />
          {expanded && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
