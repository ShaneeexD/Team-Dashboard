import { useTheme } from '../../contexts/ThemeContext';

const TestComponent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`p-4 ${isDarkMode ? 'bg-primary-800' : 'bg-primary-500'} text-white rounded-lg shadow-md`}>
      <h1 className="text-2xl font-bold">Tailwind Test Component</h1>
      <p className="mt-2">This is a test to see if Tailwind CSS is working properly.</p>
      <button className={`mt-4 px-4 py-2 ${isDarkMode ? 'bg-dark-100 text-primary-300 hover:bg-dark-200' : 'bg-white text-primary-800 hover:bg-primary-50'} rounded transition-colors`}>
        Test Button
      </button>
    </div>
  );
};

export default TestComponent;
