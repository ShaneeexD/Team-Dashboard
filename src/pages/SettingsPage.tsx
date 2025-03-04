import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuthStore } from '../store';
import ProfileSettings from '../components/settings/ProfileSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';

type SettingTab = 'profile' | 'appearance' | 'notifications' | 'security';

const SettingsPage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<SettingTab>('profile');

  const tabs: { id: SettingTab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
          Settings
        </h1>
      </div>

      <div className={`rounded-lg shadow-md overflow-hidden ${isDarkMode ? 'bg-dark-300' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className={`w-full md:w-64 p-4 md:border-r ${isDarkMode ? 'border-dark-100' : 'border-secondary-200'}`}>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-primary-600 text-white'
                        : 'bg-primary-50 text-primary-700'
                      : isDarkMode
                      ? 'text-secondary-200 hover:bg-dark-200 hover:text-white'
                      : 'text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && <ProfileSettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'security' && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
