import { useEffect, useState } from 'react';
import { useTaskStore, useEventStore } from '../store';
import { Task, Event } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const DashboardPage = () => {
  const { tasks } = useTaskStore();
  const { events } = useEventStore();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [priorityTasks, setPriorityTasks] = useState<Task[]>([]);
  const [activityStats, setActivityStats] = useState({
    completedTasks: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
  });
  const { isDarkMode } = useTheme();

  // Mock data for demonstration
  useEffect(() => {
    // Generate some mock tasks
    const mockTasks = [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
    ];

    // Generate some mock events
    const mockEvents = [
      {
        id: '1',
        title: 'Team Standup',
        description: 'Daily team standup meeting',
        location: 'Conference Room A',
        startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        endTime: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours from now
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdById: 'user123',
        attendees: ['user123', 'user456', 'user789'],
        isAllDay: false,
        color: '#4CAF50',
      },
      {
        id: '2',
        title: 'Client Call: XYZ Corp',
        description: 'Discuss project requirements and timeline',
        location: 'Zoom',
        startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        endTime: new Date(Date.now() + 90000000).toISOString(), // Tomorrow + 1 hour
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdById: 'user123',
        attendees: ['user123', 'user456'],
        isAllDay: false,
        color: '#FFA000',
      },
    ];

    // Set mock data for demonstration
    useTaskStore.getState().setTasks(mockTasks);
    useEventStore.getState().setEvents(mockEvents);

    // Filter upcoming events (next 24 hours)
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const filtered = mockEvents.filter(
      (event) => new Date(event.startTime) >= now && new Date(event.startTime) <= next24Hours
    );
    setUpcomingEvents(filtered);

    // Filter priority tasks
    const highPriorityTasks = mockTasks.filter(
      (task) => task.priority === 'high' || task.priority === 'urgent'
    );
    setPriorityTasks(highPriorityTasks);

    // Calculate stats
    setActivityStats({
      completedTasks: mockTasks.filter((task) => task.status === 'done').length,
      pendingTasks: mockTasks.filter((task) => task.status !== 'done').length,
      upcomingEvents: mockEvents.filter(
        (event) => new Date(event.startTime) >= now
      ).length,
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`card ${isDarkMode ? 'bg-primary-900/30 border-l-4 border-primary-500' : 'bg-primary-50 border-l-4 border-primary-600'}`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-primary-300' : 'text-primary-800'}`}>Tasks Completed</h3>
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-primary-300' : 'text-primary-800'}`}>{activityStats.completedTasks}</span>
          </div>
        </div>
        
        <div className={`card ${isDarkMode ? 'bg-secondary-800/50 border-l-4 border-secondary-500' : 'bg-secondary-50 border-l-4 border-secondary-600'}`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-800'}`}>Pending Tasks</h3>
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-secondary-300' : 'text-secondary-800'}`}>{activityStats.pendingTasks}</span>
          </div>
        </div>
        
        <div className={`card ${isDarkMode ? 'bg-green-900/30 border-l-4 border-green-500' : 'bg-green-50 border-l-4 border-green-600'}`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>Upcoming Events</h3>
            <span className={`text-3xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>{activityStats.upcomingEvents}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Tasks */}
        <div className={`card ${isDarkMode ? 'bg-dark-300' : ''}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : ''}`}>Priority Tasks</h2>
          <div className="space-y-4">
            {priorityTasks.length > 0 ? (
              priorityTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-3 border rounded-md ${
                    isDarkMode 
                      ? 'border-dark-100 hover:bg-dark-200' 
                      : 'hover:bg-secondary-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : ''}`}>{task.title}</h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}>{task.description}</p>
                      <div className="flex mt-2 space-x-2">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs rounded-md ${
                              isDarkMode 
                                ? 'bg-dark-100 text-secondary-300' 
                                : 'bg-secondary-100 text-secondary-800'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        task.priority === 'urgent'
                          ? isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'
                          : task.priority === 'high'
                          ? isDarkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'
                          : isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className={`mt-2 text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <p className={isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}>No priority tasks for now. Good job!</p>
            )}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className={`card ${isDarkMode ? 'bg-dark-300' : ''}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : ''}`}>Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className={`p-3 border rounded-md ${
                    isDarkMode 
                      ? 'border-dark-100 hover:bg-dark-200' 
                      : 'hover:bg-secondary-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className="w-2 h-10 rounded-md mr-3"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : ''}`}>{event.title}</h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}`}>{event.description}</p>
                      <div className={`flex mt-2 space-x-4 text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                        <span>
                          {new Date(event.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {' - '}
                          {new Date(event.endTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}>No upcoming events in the next 24 hours</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Activity Feed */}
      <div className={`card ${isDarkMode ? 'bg-dark-300' : ''}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : ''}`}>Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-primary-900/50' : 'bg-primary-100'} flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-secondary-200' : ''}`}>
                <span className="font-medium">John Doe</span> completed task{' '}
                <span className="font-medium">Update API documentation</span>
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>10 minutes ago</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'} flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-secondary-200' : ''}`}>
                <span className="font-medium">Jane Smith</span> commented on task{' '}
                <span className="font-medium">Complete project proposal</span>
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>1 hour ago</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-green-900/50' : 'bg-green-100'} flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-secondary-200' : ''}`}>
                <span className="font-medium">Team Lead</span> created a new event{' '}
                <span className="font-medium">Client Call: XYZ Corp</span>
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
