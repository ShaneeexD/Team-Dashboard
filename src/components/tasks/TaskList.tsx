import React, { useState } from 'react';
import { Task } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  const { isDarkMode } = useTheme();
  const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null);

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return isDarkMode 
          ? 'bg-blue-900/30 text-blue-300 border-blue-700' 
          : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inProgress':
        return isDarkMode 
          ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700' 
          : 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'review':
        return isDarkMode 
          ? 'bg-purple-900/30 text-purple-300 border-purple-700' 
          : 'bg-purple-100 text-purple-800 border-purple-200';
      case 'done':
        return isDarkMode 
          ? 'bg-green-900/30 text-green-300 border-green-700' 
          : 'bg-green-100 text-green-800 border-green-200';
      default:
        return isDarkMode 
          ? 'bg-gray-800 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return isDarkMode 
          ? 'bg-red-900/30 text-red-300 border-red-700' 
          : 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return isDarkMode 
          ? 'bg-orange-900/30 text-orange-300 border-orange-700' 
          : 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return isDarkMode 
          ? 'bg-blue-900/30 text-blue-300 border-blue-700' 
          : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return isDarkMode 
          ? 'bg-green-900/30 text-green-300 border-green-700' 
          : 'bg-green-100 text-green-800 border-green-200';
      default:
        return isDarkMode 
          ? 'bg-gray-800 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusOptions = (currentStatus: Task['status']) => {
    const statuses: Task['status'][] = ['todo', 'inProgress', 'review', 'done'];
    return statuses.filter(status => status !== currentStatus);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    
    return date.toLocaleDateString();
  };

  const isOverdue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    return due < now && new Date(dueDate).toDateString() !== now.toDateString();
  };

  const toggleStatusMenu = (taskId: string) => {
    if (openStatusMenu === taskId) {
      setOpenStatusMenu(null);
    } else {
      setOpenStatusMenu(taskId);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenStatusMenu(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleStatusMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the outside click handler from firing
  };

  const handleStatusChange = (e: React.MouseEvent, taskId: string, status: Task['status']) => {
    e.stopPropagation();
    onStatusChange(taskId, status);
    setOpenStatusMenu(null);
  };

  if (tasks.length === 0) {
    return (
      <div className={`p-8 text-center rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300 text-secondary-300' : 'bg-white text-secondary-500'}`}>
        <p>No tasks found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300 border border-dark-100' : 'bg-white border border-secondary-100'}`}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                  {task.title}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-md border ${getStatusColor(task.status)}`}>
                  {task.status === 'inProgress' ? 'In Progress' : 
                    task.status === 'todo' ? 'To Do' : 
                    task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs rounded-md border ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
              
              <p className={`mb-3 ${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}>
                {task.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode 
                        ? 'bg-dark-100 text-secondary-300' 
                        : 'bg-secondary-100 text-secondary-700'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className={`text-sm ${
                isOverdue(task.dueDate) && task.status !== 'done'
                  ? isDarkMode ? 'text-red-400' : 'text-red-600'
                  : isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
              }`}>
                Due: {formatDate(task.dueDate)}
                {isOverdue(task.dueDate) && task.status !== 'done' && ' (Overdue)'}
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col gap-2 self-end md:self-start">
              <div className="relative" onClick={handleStatusMenuClick}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatusMenu(task.id);
                  }}
                  className={`px-3 py-1 rounded-md text-sm ${
                    isDarkMode 
                      ? 'bg-dark-100 text-secondary-300 hover:bg-dark-200' 
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  Status ▾
                </button>
                {openStatusMenu === task.id && (
                  <div className={`absolute right-0 mt-1 w-40 rounded-md shadow-lg z-10 ${
                    isDarkMode ? 'bg-dark-200 border border-dark-100' : 'bg-white border border-secondary-100'
                  }`}>
                    <div className="py-1">
                      {getStatusOptions(task.status).map(status => (
                        <button
                          key={status}
                          onClick={(e) => handleStatusChange(e, task.id, status)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            isDarkMode 
                              ? 'text-secondary-300 hover:bg-dark-100' 
                              : 'text-secondary-700 hover:bg-secondary-50'
                          }`}
                        >
                          {status === 'inProgress' ? 'In Progress' : 
                            status === 'todo' ? 'To Do' : 
                            status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => onEdit(task)}
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode 
                    ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Edit
              </button>
              
              <button 
                onClick={() => onDelete(task.id)}
                className={`px-3 py-1 rounded-md text-sm ${
                  isDarkMode 
                    ? 'bg-red-900/30 text-red-300 hover:bg-red-900/50' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
