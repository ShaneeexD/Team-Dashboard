import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const AppearanceSettings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('blue');
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
        Appearance Settings
      </h2>
      
      <div className="space-y-6">
        {/* Theme */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Theme
          </h3>
          <div className="flex space-x-4">
            <button
              onClick={() => !isDarkMode && toggleDarkMode()}
              className={`relative w-32 h-20 rounded-lg border-2 transition-all ${
                !isDarkMode
                  ? 'border-primary-500 shadow-md'
                  : isDarkMode
                  ? 'border-dark-100 hover:border-dark-50'
                  : 'border-secondary-200 hover:border-secondary-300'
              }`}
            >
              <div className="absolute inset-0 bg-white rounded-md overflow-hidden">
                <div className="h-6 bg-secondary-100"></div>
                <div className="p-2">
                  <div className="h-2 w-3/4 bg-secondary-200 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-secondary-200 rounded"></div>
                </div>
              </div>
              <span className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-sm ${
                isDarkMode ? 'text-secondary-300' : 'text-secondary-600'
              }`}>
                Light
              </span>
              {!isDarkMode && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
            
            <button
              onClick={() => isDarkMode && toggleDarkMode()}
              className={`relative w-32 h-20 rounded-lg border-2 transition-all ${
                isDarkMode
                  ? 'border-primary-500 shadow-md'
                  : isDarkMode
                  ? 'border-dark-100 hover:border-dark-50'
                  : 'border-secondary-200 hover:border-secondary-300'
              }`}
            >
              <div className="absolute inset-0 bg-dark-400 rounded-md overflow-hidden">
                <div className="h-6 bg-dark-300"></div>
                <div className="p-2">
                  <div className="h-2 w-3/4 bg-dark-200 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-dark-200 rounded"></div>
                </div>
              </div>
              <span className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-sm ${
                isDarkMode ? 'text-secondary-300' : 'text-secondary-600'
              }`}>
                Dark
              </span>
              {isDarkMode && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
        
        {/* Color Scheme */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Color Scheme
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'blue', color: 'bg-blue-500', label: 'Blue' },
              { id: 'purple', color: 'bg-purple-500', label: 'Purple' },
              { id: 'green', color: 'bg-green-500', label: 'Green' },
              { id: 'red', color: 'bg-red-500', label: 'Red' },
              { id: 'orange', color: 'bg-orange-500', label: 'Orange' },
            ].map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id)}
                className={`relative w-12 h-12 rounded-full ${scheme.color} transition-transform ${
                  colorScheme === scheme.id ? 'ring-2 ring-offset-2 ring-secondary-400 scale-110' : ''
                }`}
                title={scheme.label}
              >
                {colorScheme === scheme.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Font Size */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Font Size
          </h3>
          <div className="flex space-x-4">
            {[
              { id: 'small', label: 'Small' },
              { id: 'medium', label: 'Medium' },
              { id: 'large', label: 'Large' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  fontSize === size.id
                    ? 'bg-primary-600 text-white'
                    : isDarkMode
                    ? 'bg-dark-200 text-secondary-300 hover:bg-dark-100'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Other Settings */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
            Additional Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="compact-mode"
                type="checkbox"
                checked={compactMode}
                onChange={() => setCompactMode(!compactMode)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label 
                htmlFor="compact-mode" 
                className={`ml-2 block text-sm ${isDarkMode ? 'text-secondary-200' : 'text-secondary-700'}`}
              >
                Compact Mode (reduce spacing)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="animations"
                type="checkbox"
                checked={animationsEnabled}
                onChange={() => setAnimationsEnabled(!animationsEnabled)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label 
                htmlFor="animations" 
                className={`ml-2 block text-sm ${isDarkMode ? 'text-secondary-200' : 'text-secondary-700'}`}
              >
                Enable animations
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
