import { create } from 'zustand';
import { Channel, Message } from '../types';

interface ChatState {
  channels: Channel[];
  activeChannelId: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
  setChannels: (channels: Channel[]) => void;
  setActiveChannelId: (channelId: string | null) => void;
  setMessages: (channelId: string, messages: Message[]) => void;
  addMessage: (channelId: string, message: Message) => void;
  updateMessage: (channelId: string, messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (channelId: string, messageId: string) => void;
  addChannel: (channel: Channel) => void;
  updateChannel: (channelId: string, updates: Partial<Channel>) => void;
  deleteChannel: (channelId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useChatStore = create<ChatState>((set) => ({
  channels: [],
  activeChannelId: null,
  messages: {},
  isLoading: false,
  error: null,
  setChannels: (channels) => set({ channels }),
  setActiveChannelId: (activeChannelId) => set({ activeChannelId }),
  setMessages: (channelId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [channelId]: messages },
    })),
  addMessage: (channelId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: [...(state.messages[channelId] || []), message],
      },
    })),
  updateMessage: (channelId, messageId, updates) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).map((message) =>
          message.id === messageId ? { ...message, ...updates } : message
        ),
      },
    })),
  deleteMessage: (channelId, messageId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: (state.messages[channelId] || []).filter(
          (message) => message.id !== messageId
        ),
      },
    })),
  addChannel: (channel) =>
    set((state) => ({
      channels: [...state.channels, channel],
    })),
  updateChannel: (channelId, updates) =>
    set((state) => ({
      channels: state.channels.map((channel) =>
        channel.id === channelId ? { ...channel, ...updates } : channel
      ),
    })),
  deleteChannel: (channelId) =>
    set((state) => ({
      channels: state.channels.filter((channel) => channel.id !== channelId),
      activeChannelId:
        state.activeChannelId === channelId ? null : state.activeChannelId,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useChatStore;
