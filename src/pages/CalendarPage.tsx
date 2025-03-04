import { useState, useEffect, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css';
import { format, parse, startOfWeek, getDay, endOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useTheme } from '../contexts/ThemeContext';
import { useTaskStore, useEventStore } from '../store';
import { Task, Event } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Setup the localizer using date-fns
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: {
    type: 'task' | 'event';
    data: Task | Event;
  };
}

const CalendarPage = () => {
  const { isDarkMode } = useTheme();
  const { tasks } = useTaskStore();
  const { events, setEvents } = useEventStore();
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Generate mock events if none exist
  useEffect(() => {
    if (events.length === 0) {
      const today = new Date();
      const endOfCurrentMonth = endOfMonth(today);
      
      const daysInMonth = endOfCurrentMonth.getDate();
      const mockEvents: Event[] = [];
      
      // Generate 5 random events for the current month
      for (let i = 0; i < 5; i++) {
        const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
        const randomHour = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
        const randomDuration = Math.floor(Math.random() * 3) + 1; // 1 to 3 hours
        
        const startTime = new Date(today.getFullYear(), today.getMonth(), randomDay, randomHour);
        const endTime = new Date(today.getFullYear(), today.getMonth(), randomDay, randomHour + randomDuration);
        
        mockEvents.push({
          id: uuidv4(),
          title: `Event ${i + 1}`,
          description: `This is a mock event ${i + 1}`,
          location: i % 2 === 0 ? 'Conference Room A' : 'Virtual Meeting',
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdById: 'user123',
          attendees: ['user123'],
          isAllDay: i === 0, // Make the first event all-day
          color: ['#4f46e5', '#0891b2', '#7c3aed', '#059669', '#d97706'][i], // Different colors for events
        });
      }
      
      setEvents(mockEvents);
    }
  }, [events.length, setEvents]);

  // Convert tasks and events to calendar events
  useEffect(() => {
    const taskEvents: CalendarEvent[] = tasks.map(task => ({
      id: `task-${task.id}`,
      title: `📋 ${task.title}`,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: {
        type: 'task',
        data: task,
      },
    }));

    const eventEvents: CalendarEvent[] = events.map(event => ({
      id: `event-${event.id}`,
      title: `🗓️ ${event.title}`,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      allDay: event.isAllDay,
      resource: {
        type: 'event',
        data: event,
      },
    }));

    setCalendarEvents([...taskEvents, ...eventEvents]);
  }, [tasks, events]);

  // Custom event styling
  const eventStyleGetter = (event: CalendarEvent) => {
    const isTask = event.resource?.type === 'task';
    const taskStatus = isTask ? (event.resource?.data as Task).status : null;
    const taskPriority = isTask ? (event.resource?.data as Task).priority : null;
    const eventColor = !isTask ? (event.resource?.data as Event).color : null;
    
    let backgroundColor = eventColor || '#4f46e5'; // Default color
    
    if (isTask) {
      switch (taskStatus) {
        case 'todo':
          backgroundColor = '#3b82f6'; // blue
          break;
        case 'inProgress':
          backgroundColor = '#eab308'; // yellow
          break;
        case 'review':
          backgroundColor = '#8b5cf6'; // purple
          break;
        case 'done':
          backgroundColor = '#22c55e'; // green
          break;
      }
      
      // Adjust color based on priority for tasks
      if (taskPriority === 'urgent') {
        backgroundColor = '#ef4444'; // red
      } else if (taskPriority === 'high') {
        backgroundColor = '#f97316'; // orange
      }
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  // Custom day cell styling
  const dayPropGetter = (date: Date) => {
    const today = new Date();
    const isToday = 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    
    return {
      className: isToday ? 'rbc-today' : '',
      style: {
        backgroundColor: isDarkMode 
          ? (isToday ? 'rgba(59, 130, 246, 0.1)' : '') 
          : (isToday ? 'rgba(59, 130, 246, 0.05)' : ''),
      },
    };
  };

  // Custom toolbar component
  const CustomToolbar = ({ label, onNavigate, onView }: any) => {
    return (
      <div className={`rbc-toolbar ${isDarkMode ? 'dark-toolbar' : ''}`}>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('TODAY')}>Today</button>
          <button type="button" onClick={() => onNavigate('PREV')}>Back</button>
          <button type="button" onClick={() => onNavigate('NEXT')}>Next</button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">
          <button 
            type="button" 
            className={view === Views.MONTH ? 'rbc-active' : ''}
            onClick={() => onView(Views.MONTH)}
          >
            Month
          </button>
          <button 
            type="button" 
            className={view === Views.WEEK ? 'rbc-active' : ''}
            onClick={() => onView(Views.WEEK)}
          >
            Week
          </button>
          <button 
            type="button" 
            className={view === Views.DAY ? 'rbc-active' : ''}
            onClick={() => onView(Views.DAY)}
          >
            Day
          </button>
          <button 
            type="button" 
            className={view === Views.AGENDA ? 'rbc-active' : ''}
            onClick={() => onView(Views.AGENDA)}
          >
            Agenda
          </button>
        </span>
      </div>
    );
  };

  // Event details popup
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Custom calendar styles
  const calendarStyles = useMemo(() => {
    return {
      '.rbc-calendar': {
        backgroundColor: isDarkMode ? '#1f2937' : 'white',
        color: isDarkMode ? '#e5e7eb' : '#374151',
      },
      '.rbc-toolbar': {
        color: isDarkMode ? '#e5e7eb' : '#374151',
      },
      '.rbc-toolbar button': {
        color: isDarkMode ? '#e5e7eb' : '#374151',
        border: isDarkMode ? '1px solid #4b5563' : '1px solid #d1d5db',
      },
      '.rbc-toolbar button:hover': {
        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
      },
      '.rbc-toolbar button.rbc-active': {
        backgroundColor: isDarkMode ? '#3b82f6' : '#3b82f6',
        color: 'white',
      },
      '.rbc-header': {
        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
        color: isDarkMode ? '#e5e7eb' : '#374151',
        borderBottom: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
      },
      '.rbc-month-view': {
        border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
      },
      '.rbc-day-bg': {
        backgroundColor: isDarkMode ? '#1f2937' : 'white',
      },
      '.rbc-off-range-bg': {
        backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
      },
      '.rbc-date-cell': {
        color: isDarkMode ? '#e5e7eb' : '#374151',
      },
      '.rbc-today': {
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
      },
      '.rbc-event': {
        backgroundColor: '#3b82f6',
      },
      '.rbc-show-more': {
        color: isDarkMode ? '#60a5fa' : '#3b82f6',
      },
    };
  }, [isDarkMode]);

  return (
    <div className={`space-y-6 ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
          Calendar
        </h1>
      </div>

      <div 
        className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300' : 'bg-white'}`}
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <style>
          {Object.entries(calendarStyles).map(([selector, styles]) => 
            `${selector} { ${Object.entries(styles as any).map(([prop, value]) => `${prop}: ${value};`).join(' ')} }`
          ).join('\n')}
        </style>
        
        <Calendar
          localizer={localizer as any}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          view={view}
          onView={setView}
          onNavigate={setDate}
          date={date}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          components={{
            toolbar: CustomToolbar,
          }}
          onSelectEvent={handleSelectEvent}
          popup
        />
      </div>

      {/* Event Details Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className={`p-6 rounded-lg shadow-lg max-w-md w-full ${
              isDarkMode ? 'bg-dark-300 text-white' : 'bg-white text-secondary-900'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedEvent.title.substring(2)}</h3>
              <button 
                onClick={handleClosePopup}
                className="text-secondary-500 hover:text-secondary-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              {selectedEvent.resource?.type === 'task' && (
                <>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      isDarkMode 
                        ? 'bg-blue-900/30 text-blue-300 border border-blue-700' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      Task
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-md ${
                      isDarkMode 
                        ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' 
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                      {(selectedEvent.resource.data as Task).status === 'inProgress' ? 'In Progress' : 
                        (selectedEvent.resource.data as Task).status === 'todo' ? 'To Do' : 
                        (selectedEvent.resource.data as Task).status.charAt(0).toUpperCase() + (selectedEvent.resource.data as Task).status.slice(1)}
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-md ${
                      isDarkMode 
                        ? 'bg-red-900/30 text-red-300 border border-red-700' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {(selectedEvent.resource.data as Task).priority.charAt(0).toUpperCase() + (selectedEvent.resource.data as Task).priority.slice(1)}
                    </span>
                  </div>
                  <p className={isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}>
                    {(selectedEvent.resource.data as Task).description}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                    Due: {format(selectedEvent.start, 'PPP')}
                  </p>
                </>
              )}
              
              {selectedEvent.resource?.type === 'event' && (
                <>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      isDarkMode 
                        ? 'bg-purple-900/30 text-purple-300 border border-purple-700' 
                        : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}>
                      Event
                    </span>
                    {(selectedEvent.resource.data as Event).isAllDay && (
                      <span className={`ml-2 px-2 py-1 text-xs rounded-md ${
                        isDarkMode 
                          ? 'bg-green-900/30 text-green-300 border border-green-700' 
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        All Day
                      </span>
                    )}
                  </div>
                  <p className={isDarkMode ? 'text-secondary-300' : 'text-secondary-600'}>
                    {(selectedEvent.resource.data as Event).description}
                  </p>
                  {(selectedEvent.resource.data as Event).location && (
                    <p className={`text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                      Location: {(selectedEvent.resource.data as Event).location}
                    </p>
                  )}
                  <p className={`text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                    {(selectedEvent.resource.data as Event).isAllDay 
                      ? `Date: ${format(selectedEvent.start, 'PPP')}` 
                      : `Time: ${format(selectedEvent.start, 'PPp')} - ${format(selectedEvent.end, 'PPp')}`}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
                    Attendees: {(selectedEvent.resource.data as Event).attendees.length}
                  </p>
                </>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClosePopup}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
