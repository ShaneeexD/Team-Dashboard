import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface TaskFiltersProps {
  filters: {
    status: string;
    priority: string;
    search: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    status: string;
    priority: string;
    search: string;
  }>>;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, setFilters }) => {
  const { isDarkMode } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, status: e.target.value }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, priority: e.target.value }));
  };

  const handleReset = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      search: '',
    });
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300' : 'bg-white'}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label 
            htmlFor="search" 
            className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search tasks by title, description or tags"
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white placeholder-secondary-500 focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          />
        </div>
        
        <div>
          <label 
            htmlFor="status" 
            className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={handleStatusChange}
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div>
          <label 
            htmlFor="priority" 
            className={`block mb-1 text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Priority
          </label>
          <select
            id="priority"
            value={filters.priority}
            onChange={handlePriorityChange}
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      {(filters.status !== 'all' || filters.priority !== 'all' || filters.search) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className={`px-3 py-1 text-sm rounded-md ${
              isDarkMode 
                ? 'bg-dark-100 text-secondary-300 hover:bg-dark-200' 
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;
