import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuthStore } from '../../store';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuthStore();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-dark-500 text-white' : 'bg-secondary-100'}`}>
      {user && <Sidebar />}
      <div className={`flex flex-col flex-1 ${user ? 'ml-64' : ''}`}>
        {user && <Header />}
        <main className={`flex-1 p-6 overflow-y-auto ${isDarkMode ? 'bg-dark-400' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
