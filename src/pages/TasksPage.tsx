import { useState, useEffect } from 'react';
import { useTaskStore } from '../store';
import { Task } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import { v4 as uuidv4 } from 'uuid';

const TasksPage = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
  });
  const { isDarkMode } = useTheme();

  // Generate mock tasks if none exist
  useEffect(() => {
    if (tasks.length === 0) {
      const mockTasks = [
        {
          id: uuidv4(),
          title: 'Complete project proposal',
          description: 'Finalize the proposal document for the new client project',
          status: 'inProgress' as const,
          priority: 'high' as const,
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          assigneeId: 'user123',
          createdById: 'user123',
          tags: ['proposal', 'client'],
        },
        {
          id: uuidv4(),
          title: 'Review code for PR #42',
          description: 'Review and provide feedback on the authentication feature',
          status: 'todo' as const,
          priority: 'medium' as const,
          dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          assigneeId: 'user123',
          createdById: 'user456',
          tags: ['code-review', 'auth'],
        },
        {
          id: uuidv4(),
          title: 'Prepare for client meeting',
          description: 'Create presentation slides for the next client meeting',
          status: 'todo' as const,
          priority: 'urgent' as const,
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          assigneeId: 'user123',
          createdById: 'user123',
          tags: ['client', 'presentation'],
        },
        {
          id: uuidv4(),
          title: 'Update API documentation',
          description: 'Update the API documentation with the latest endpoints',
          status: 'done' as const,
          priority: 'low' as const,
          dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          assigneeId: 'user123',
          createdById: 'user123',
          tags: ['documentation', 'api'],
        },
        {
          id: uuidv4(),
          title: 'Fix navigation bug',
          description: 'Fix the bug in the navigation menu that causes it to collapse unexpectedly',
          status: 'review' as const,
          priority: 'high' as const,
          dueDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
          createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          updatedAt: new Date().toISOString(),
          assigneeId: 'user456',
          createdById: 'user123',
          tags: ['bug', 'ui'],
        },
      ];
      
      useTaskStore.getState().setTasks(mockTasks);
    }
  }, [tasks.length]);

  // Apply filters to tasks
  useEffect(() => {
    let result = [...tasks];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(task => task.status === filters.status);
    }
    
    // Filter by priority
    if (filters.priority !== 'all') {
      result = result.filter(task => task.priority === filters.priority);
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        task => 
          task.title.toLowerCase().includes(searchLower) || 
          task.description.toLowerCase().includes(searchLower) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort by priority (urgent > high > medium > low) and then by due date
    result.sort((a, b) => {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    
    setFilteredTasks(result);
  }, [tasks, filters]);

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addTask(newTask);
    setIsAddingTask(false);
  };

  const handleUpdateTask = (task: Task) => {
    updateTask(task.id, {
      ...task,
      updatedAt: new Date().toISOString(),
    });
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsAddingTask(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { 
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
          Tasks
        </h1>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsAddingTask(true);
          }}
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          Add Task
        </button>
      </div>

      <TaskFilters filters={filters} setFilters={setFilters} />

      {isAddingTask ? (
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300' : 'bg-white'}`}>
          <TaskForm 
            onSubmit={editingTask ? handleUpdateTask : handleAddTask} 
            onCancel={() => {
              setIsAddingTask(false);
              setEditingTask(null);
            }}
            initialValues={editingTask || undefined}
          />
        </div>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onEdit={handleEditTask} 
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default TasksPage;
