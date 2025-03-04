import { create } from 'zustand';
import { Event } from '../types';

interface EventState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useEventStore = create<EventState>((set) => ({
  events: [],
  isLoading: false,
  error: null,
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updates } : event
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useEventStore;
