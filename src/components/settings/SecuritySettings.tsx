import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const SecuritySettings = () => {
  const { isDarkMode } = useTheme();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!currentPassword) {
      setError('Current password is required');
      return;
    }
    
    if (!newPassword) {
      setError('New password is required');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
        Security Settings
      </h2>
      
      <div className="space-y-8">
        {/* Password Change */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div>
              <label 
                htmlFor="current-password" 
                className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
              >
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-dark-200 text-white border-dark-100'
                    : 'bg-white text-secondary-900 border-secondary-300'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
            
            <div>
              <label 
                htmlFor="new-password" 
                className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-dark-200 text-white border-dark-100'
                    : 'bg-white text-secondary-900 border-secondary-300'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label 
                htmlFor="confirm-password" 
                className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-dark-200 text-white border-dark-100'
                    : 'bg-white text-secondary-900 border-secondary-300'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            {success && (
              <div className="text-green-500 text-sm">{success}</div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isChangingPassword}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Two-Factor Authentication */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Two-Factor Authentication
          </h3>
          <div className="flex items-center justify-between max-w-md">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                Add an extra layer of security to your account
              </p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                We'll send you a code via email or authenticator app
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                id="two-factor"
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className="sr-only"
              />
              <div className={`block w-10 h-6 rounded-full ${
                twoFactorEnabled 
                  ? 'bg-primary-600' 
                  : isDarkMode ? 'bg-dark-100' : 'bg-secondary-200'
              }`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                twoFactorEnabled ? 'transform translate-x-4' : ''
              }`}></div>
            </div>
          </div>
          
          {twoFactorEnabled && (
            <div className={`mt-4 p-4 rounded-md max-w-md ${
              isDarkMode ? 'bg-dark-200' : 'bg-secondary-50'
            }`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                Two-factor authentication is enabled
              </p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                You'll be asked for a verification code when you sign in on a new device.
              </p>
              <button
                className={`mt-3 text-sm font-medium ${
                  isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                }`}
              >
                Configure authenticator app
              </button>
            </div>
          )}
        </div>
        
        {/* Session Management */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Session Management
          </h3>
          <div className="max-w-md">
            <div className="mb-4">
              <label 
                htmlFor="session-timeout" 
                className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
              >
                Session Timeout (minutes)
              </label>
              <select
                id="session-timeout"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className={`block w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-dark-200 text-white border-dark-100'
                    : 'bg-white text-secondary-900 border-secondary-300'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
              </select>
              <p className={`mt-1 text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                You'll be automatically logged out after this period of inactivity
              </p>
            </div>
            
            <button
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              Log Out All Other Sessions
            </button>
          </div>
        </div>
        
        {/* Login History */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Recent Login Activity
          </h3>
          <div className={`border rounded-md overflow-hidden ${
            isDarkMode ? 'border-dark-100' : 'border-secondary-200'
          }`}>
            <table className="min-w-full divide-y divide-secondary-200 dark:divide-dark-100">
              <thead className={isDarkMode ? 'bg-dark-200' : 'bg-secondary-50'}>
                <tr>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
                  } uppercase tracking-wider`}>
                    Device
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
                  } uppercase tracking-wider`}>
                    Location
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
                  } uppercase tracking-wider`}>
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isDarkMode ? 'divide-dark-100' : 'divide-secondary-200'
              }`}>
                <tr className={isDarkMode ? 'bg-dark-300' : 'bg-white'}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-white' : 'text-secondary-900'
                  }`}>
                    Chrome on Windows
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-secondary-300' : 'text-secondary-500'
                  }`}>
                    San Francisco, CA
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-secondary-300' : 'text-secondary-500'
                  }`}>
                    Just now (Current)
                  </td>
                </tr>
                <tr className={isDarkMode ? 'bg-dark-300' : 'bg-white'}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-white' : 'text-secondary-900'
                  }`}>
                    Safari on iPhone
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-secondary-300' : 'text-secondary-500'
                  }`}>
                    San Francisco, CA
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-secondary-300' : 'text-secondary-500'
                  }`}>
                    Yesterday at 2:45 PM
                  </td>
                </tr>
                <tr className={isDarkMode ? 'bg-dark-300' : 'bg-white'}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-white' : 'text-secondary-900'
                  }`}>
                    Chrome on MacBook
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-secondary-300' : 'text-secondary-500'
                  }`}>
                    New York, NY
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-secondary-300' : 'text-secondary-500'
                  }`}>
                    March 2, 2025 at 10:30 AM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
