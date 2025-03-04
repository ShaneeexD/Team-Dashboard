import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const NotificationSettings = () => {
  const { isDarkMode } = useTheme();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    taskAssigned: true,
    taskUpdated: true,
    taskCompleted: false,
    messageReceived: true,
    eventReminders: true,
    systemUpdates: false,
    marketingEmails: false,
  });
  
  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
        Notification Settings
      </h2>
      
      <div className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Notification Channels
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label 
                  htmlFor="email-notifications" 
                  className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
                >
                  Email Notifications
                </label>
                <p className={`text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                  Receive notifications via email
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="email-notifications"
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.emailNotifications 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.emailNotifications ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label 
                  htmlFor="push-notifications" 
                  className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
                >
                  Push Notifications
                </label>
                <p className={`text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                  Receive notifications in the browser
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="push-notifications"
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.pushNotifications 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.pushNotifications ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Task Notifications */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Task Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="task-reminders" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                Task Reminders
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="task-reminders"
                  type="checkbox"
                  checked={settings.taskReminders}
                  onChange={() => handleToggle('taskReminders')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.taskReminders 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.taskReminders ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label 
                htmlFor="task-assigned" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                When a task is assigned to me
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="task-assigned"
                  type="checkbox"
                  checked={settings.taskAssigned}
                  onChange={() => handleToggle('taskAssigned')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.taskAssigned 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.taskAssigned ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label 
                htmlFor="task-updated" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                When a task I'm assigned to is updated
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="task-updated"
                  type="checkbox"
                  checked={settings.taskUpdated}
                  onChange={() => handleToggle('taskUpdated')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.taskUpdated 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.taskUpdated ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label 
                htmlFor="task-completed" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                When a task I created is completed
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="task-completed"
                  type="checkbox"
                  checked={settings.taskCompleted}
                  onChange={() => handleToggle('taskCompleted')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.taskCompleted 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.taskCompleted ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other Notifications */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Other Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="message-received" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                When I receive a new message
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="message-received"
                  type="checkbox"
                  checked={settings.messageReceived}
                  onChange={() => handleToggle('messageReceived')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.messageReceived 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.messageReceived ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label 
                htmlFor="event-reminders" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                Event reminders
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="event-reminders"
                  type="checkbox"
                  checked={settings.eventReminders}
                  onChange={() => handleToggle('eventReminders')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.eventReminders 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.eventReminders ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label 
                htmlFor="system-updates" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                System updates and announcements
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="system-updates"
                  type="checkbox"
                  checked={settings.systemUpdates}
                  onChange={() => handleToggle('systemUpdates')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.systemUpdates 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.systemUpdates ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label 
                htmlFor="marketing-emails" 
                className={`block text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}
              >
                Marketing emails and newsletters
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  id="marketing-emails"
                  type="checkbox"
                  checked={settings.marketingEmails}
                  onChange={() => handleToggle('marketingEmails')}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full ${
                  settings.marketingEmails 
                    ? 'bg-primary-600' 
                    : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  settings.marketingEmails ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
