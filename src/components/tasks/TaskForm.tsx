import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface TaskFormProps {
  onSubmit: (task: Task | Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialValues?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialValues }) => {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('todo');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with initial values if provided (for editing)
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setStatus(initialValues.status);
      setPriority(initialValues.priority);
      setDueDate(new Date(initialValues.dueDate).toISOString().split('T')[0]);
      setTags(initialValues.tags);
    } else {
      // Set default due date to tomorrow for new tasks
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [initialValues]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const taskData = {
      ...(initialValues ? { id: initialValues.id } : {}),
      title,
      description,
      status,
      priority,
      dueDate: new Date(dueDate).toISOString(),
      assigneeId: 'user123', // In a real app, this would be the current user or selected assignee
      createdById: 'user123', // In a real app, this would be the current user
      tags,
      ...(initialValues ? { 
        createdAt: initialValues.createdAt,
        updatedAt: new Date().toISOString()
      } : {})
    };
    
    onSubmit(taskData as any);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : ''}`}>
        {initialValues ? 'Edit Task' : 'Create New Task'}
      </h2>
      
      <div>
        <label 
          htmlFor="title" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          placeholder="Task title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>
      
      <div>
        <label 
          htmlFor="description" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          placeholder="Task description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="status" 
            className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div>
          <label 
            htmlFor="priority" 
            className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
      
      <div>
        <label 
          htmlFor="dueDate" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
        />
        {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
      </div>
      
      <div>
        <label 
          htmlFor="tags" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Tags
        </label>
        <div className="flex">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className={`flex-1 px-3 py-2 rounded-l-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
            placeholder="Add a tag and press Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className={`px-4 py-2 rounded-r-md ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            Add
          </button>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className={`px-2 py-1 text-sm rounded-full flex items-center ${
                  isDarkMode 
                    ? 'bg-dark-100 text-secondary-300' 
                    : 'bg-secondary-100 text-secondary-700'
                }`}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-xs rounded-full w-4 h-4 flex items-center justify-center hover:bg-secondary-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-dark-100 text-secondary-300 hover:bg-dark-200' 
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {initialValues ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
