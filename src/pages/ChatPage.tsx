import { useState, useEffect } from 'react';
import { useChatStore, useAuthStore } from '../store';
import { useTheme } from '../contexts/ThemeContext';
import { Channel, Message } from '../types';
import ChannelList from '../components/chat/ChannelList';
import ChatArea from '../components/chat/ChatArea';
import NewChannelModal from '../components/chat/NewChannelModal';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuthStore();
  const { 
    channels, 
    activeChannelId, 
    messages, 
    setChannels, 
    setActiveChannelId, 
    setMessages,
    addChannel,
    deleteChannel,
    addMessage
  } = useChatStore();
  
  const [isNewChannelModalOpen, setIsNewChannelModalOpen] = useState(false);
  const [newPrivateChatUserId, setNewPrivateChatUserId] = useState<string | null>(null);

  // Generate mock channels and messages if none exist
  useEffect(() => {
    if (channels.length === 0) {
      const generalChannel: Channel = {
        id: 'channel-1',
        name: 'General',
        description: 'General team discussions',
        type: 'public',
        createdAt: new Date().toISOString(),
        createdById: 'user123',
        members: ['user123', 'user456', 'user789'],
      };
      
      const projectsChannel: Channel = {
        id: 'channel-2',
        name: 'Projects',
        description: 'Project updates and discussions',
        type: 'public',
        createdAt: new Date().toISOString(),
        createdById: 'user123',
        members: ['user123', 'user456'],
      };
      
      const randomChannel: Channel = {
        id: 'channel-3',
        name: 'Random',
        description: 'Random conversations',
        type: 'public',
        createdAt: new Date().toISOString(),
        createdById: 'user456',
        members: ['user123', 'user456', 'user789'],
      };
      
      // Private chat example
      const privateChat: Channel = {
        id: 'private-1',
        name: 'Jane Smith',
        description: 'Private chat with Jane Smith',
        type: 'private',
        createdAt: new Date().toISOString(),
        createdById: 'user123',
        members: ['user123', 'user456'],
      };
      
      const mockChannels = [generalChannel, projectsChannel, randomChannel, privateChat];
      setChannels(mockChannels);
      
      // Generate mock messages for each channel
      const mockMessages: Record<string, Message[]> = {};
      
      mockChannels.forEach(channel => {
        const channelMessages: Message[] = [];
        
        // Add 5-10 random messages for each channel
        const messageCount = Math.floor(Math.random() * 6) + 5;
        
        for (let i = 0; i < messageCount; i++) {
          const userId = channel.members[Math.floor(Math.random() * channel.members.length)];
          const isCurrentUser = userId === 'user123';
          
          const message: Message = {
            id: `msg-${channel.id}-${i}`,
            content: `This is a ${isCurrentUser ? 'sent' : 'received'} message ${i + 1} in the ${channel.name} channel.`,
            createdAt: new Date(Date.now() - (messageCount - i) * 1000 * 60 * 10).toISOString(), // 10 minutes apart
            updatedAt: new Date(Date.now() - (messageCount - i) * 1000 * 60 * 10).toISOString(),
            userId,
            channelId: channel.id,
          };
          
          channelMessages.push(message);
        }
        
        mockMessages[channel.id] = channelMessages;
      });
      
      // Set messages for each channel
      Object.entries(mockMessages).forEach(([channelId, channelMessages]) => {
        setMessages(channelId, channelMessages);
      });
      
      // Set active channel to the first one
      setActiveChannelId(mockChannels[0].id);
    }
  }, [channels.length, setChannels, setMessages, setActiveChannelId]);

  const handleSendMessage = (content: string) => {
    if (!activeChannelId || !content.trim() || !user) return;
    
    const newMessage: Message = {
      id: uuidv4(),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
      channelId: activeChannelId,
    };
    
    addMessage(activeChannelId, newMessage);
  };

  const handleCreateChannel = (channelData: Omit<Channel, 'id' | 'createdAt' | 'createdById'>) => {
    if (!user) return;
    
    const newChannel: Channel = {
      ...channelData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      createdById: user.id,
    };
    
    addChannel(newChannel);
    setActiveChannelId(newChannel.id);
    setIsNewChannelModalOpen(false);
  };

  const handleStartPrivateChat = (userId: string, userName: string) => {
    if (!user) return;
    
    // Check if private chat already exists
    const existingPrivateChat = channels.find(
      channel => 
        channel.type === 'private' && 
        channel.members.includes(user.id) && 
        channel.members.includes(userId) &&
        channel.members.length === 2
    );
    
    if (existingPrivateChat) {
      setActiveChannelId(existingPrivateChat.id);
      return;
    }
    
    // Create new private chat
    const newPrivateChat: Channel = {
      id: uuidv4(),
      name: userName,
      description: `Private chat with ${userName}`,
      type: 'private',
      createdAt: new Date().toISOString(),
      createdById: user.id,
      members: [user.id, userId],
    };
    
    addChannel(newPrivateChat);
    setActiveChannelId(newPrivateChat.id);
    setMessages(newPrivateChat.id, []);
  };

  const activeChannel = channels.find(channel => channel.id === activeChannelId);
  const activeMessages = activeChannelId ? messages[activeChannelId] || [] : [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
          Chat
        </h1>
        <button
          onClick={() => setIsNewChannelModalOpen(true)}
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          New Channel
        </button>
      </div>

      <div className={`flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-200px)]`}>
        <div className={`md:col-span-1 ${isDarkMode ? 'bg-dark-300' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
          <ChannelList 
            channels={channels}
            activeChannelId={activeChannelId}
            onSelectChannel={setActiveChannelId}
            onStartPrivateChat={setNewPrivateChatUserId}
          />
        </div>
        
        <div className={`md:col-span-3 ${isDarkMode ? 'bg-dark-300' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
          {activeChannel && (
            <ChatArea 
              channel={activeChannel}
              messages={activeMessages}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>

      {isNewChannelModalOpen && (
        <NewChannelModal 
          onClose={() => setIsNewChannelModalOpen(false)}
          onCreateChannel={handleCreateChannel}
        />
      )}

      {newPrivateChatUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className={`p-6 rounded-lg shadow-lg max-w-md w-full ${
              isDarkMode ? 'bg-dark-300 text-white' : 'bg-white text-secondary-900'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">Start Private Chat</h3>
            <p className="mb-4">Who would you like to chat with?</p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {/* Mock users list */}
              {[
                { id: 'user456', name: 'Jane Smith' },
                { id: 'user789', name: 'Michael Johnson' },
                { id: 'user101', name: 'Emily Davis' },
              ].map(mockUser => (
                <button
                  key={mockUser.id}
                  onClick={() => {
                    handleStartPrivateChat(mockUser.id, mockUser.name);
                    setNewPrivateChatUserId(null);
                  }}
                  className={`w-full text-left p-3 rounded-md ${
                    isDarkMode 
                      ? 'hover:bg-dark-200' 
                      : 'hover:bg-secondary-50'
                  }`}
                >
                  {mockUser.name}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setNewPrivateChatUserId(null)}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-dark-100 text-secondary-300 hover:bg-dark-200' 
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
