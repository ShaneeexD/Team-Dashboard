import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { useTheme } from '../../contexts/ThemeContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  // Function to fill in demo credentials
  const fillDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('password');
  };
  
  // In a real app, this would connect to Firebase auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock login for demonstration
      // In a real app, you would use Firebase auth
      if (email === 'demo@example.com' && password === 'password') {
        // Mock user data
        const mockUser = {
          id: 'user123',
          displayName: 'Demo User',
          email: 'demo@example.com',
          photoURL: 'https://via.placeholder.com/150',
          role: 'admin' as const,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        
        // Set the user in our store
        setTimeout(() => {
          useAuthStore.getState().setUser(mockUser);
          setIsLoading(false);
          navigate('/'); // Redirect to dashboard after successful login
        }, 1000);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <button
          type="button"
          onClick={fillDemoCredentials}
          className={`w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
            isDarkMode 
              ? 'border-primary-700 text-primary-400 bg-dark-300 hover:bg-dark-200' 
              : 'border-primary-300 text-primary-700 bg-primary-50 hover:bg-primary-100'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
        >
          Auto-fill Demo Credentials
        </button>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}>
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                isDarkMode 
                  ? 'border-dark-100 bg-dark-300 text-white' 
                  : 'border-secondary-300 bg-white text-secondary-900'
              }`}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}>
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                isDarkMode 
                  ? 'border-dark-100 bg-dark-300 text-white' 
                  : 'border-secondary-300 bg-white text-secondary-900'
              }`}
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDarkMode ? 'border-dark-100' : 'border-secondary-300'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${isDarkMode ? 'bg-dark-400 text-secondary-400' : 'bg-white text-secondary-500'}`}>Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
              isDarkMode 
                ? 'border-dark-100 bg-dark-300 text-secondary-300 hover:bg-dark-200' 
                : 'border-secondary-300 bg-white text-secondary-500 hover:bg-secondary-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            type="button"
            className={`w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
              isDarkMode 
                ? 'border-dark-100 bg-dark-300 text-secondary-300 hover:bg-dark-200' 
                : 'border-secondary-300 bg-white text-secondary-500 hover:bg-secondary-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10c0-5.522-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
