import LoginForm from '../components/auth/LoginForm';
import { useTheme } from '../contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-dark-500 text-white' : 'bg-secondary-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-dark-300 text-yellow-300 hover:bg-dark-200' : 'bg-secondary-200 text-secondary-600 hover:bg-secondary-300'}`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>
      
      <div className={`max-w-md w-full space-y-8 ${isDarkMode ? 'bg-dark-400 p-8 rounded-lg shadow-lg' : ''}`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}>
            Or{' '}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              start your 14-day free trial
            </a>
          </p>
          <div className={`mt-4 p-3 ${isDarkMode ? 'bg-dark-300 border border-dark-200' : 'bg-primary-50 border border-primary-200'} rounded-md`}>
            <p className={`text-center ${isDarkMode ? 'text-primary-400 font-medium' : 'text-primary-800 font-medium'}`}>
              Demo credentials:
            </p>
            <p className={`text-center ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>
              Email: <span className={`font-mono ${isDarkMode ? 'bg-dark-200' : 'bg-white'} px-2 py-1 rounded`}>demo@example.com</span>
            </p>
            <p className={`text-center ${isDarkMode ? 'text-primary-300' : 'text-primary-700'}`}>
              Password: <span className={`font-mono ${isDarkMode ? 'bg-dark-200' : 'bg-white'} px-2 py-1 rounded`}>password</span>
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
