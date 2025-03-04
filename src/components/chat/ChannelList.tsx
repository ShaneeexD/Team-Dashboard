import React, { useState } from 'react';
import { Channel } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { FaHashtag, FaSearch, FaPlus } from 'react-icons/fa';

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string | null;
  onSelectChannel: (channelId: string) => void;
  onStartPrivateChat: (userId: string | null) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  activeChannelId,
  onSelectChannel,
  onStartPrivateChat,
}) => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  // Separate channels by type
  const publicChannels = channels.filter(
    channel => channel.type === 'public' && 
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const privateChats = channels.filter(
    channel => channel.type === 'private' && 
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-secondary-200 dark:border-dark-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search channels"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full py-2 pl-9 pr-3 rounded-md ${
              isDarkMode
                ? 'bg-dark-200 text-white placeholder-secondary-400 border-dark-100'
                : 'bg-secondary-100 text-secondary-900 placeholder-secondary-500 border-secondary-200'
            } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          <FaSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
            }`}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {/* Public Channels */}
        <div className="mb-4">
          <div className="flex justify-between items-center px-2 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
            <span>Channels</span>
          </div>
          
          <div className="space-y-1 mt-1">
            {publicChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => onSelectChannel(channel.id)}
                className={`w-full flex items-center px-2 py-1.5 rounded-md transition-colors ${
                  channel.id === activeChannelId
                    ? isDarkMode
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-100 text-primary-900'
                    : isDarkMode
                    ? 'text-secondary-200 hover:bg-dark-200'
                    : 'text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                <FaHashtag className="mr-2 text-secondary-400" />
                <span className="truncate">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Private Chats */}
        <div>
          <div className="flex justify-between items-center px-2 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400">
            <span>Direct Messages</span>
            <button
              onClick={() => onStartPrivateChat('new')}
              className={`p-1 rounded-md ${
                isDarkMode
                  ? 'hover:bg-dark-200 text-secondary-400 hover:text-secondary-300'
                  : 'hover:bg-secondary-200 text-secondary-500 hover:text-secondary-700'
              }`}
            >
              <FaPlus size={12} />
            </button>
          </div>
          
          <div className="space-y-1 mt-1">
            {privateChats.map((channel) => (
              <button
                key={channel.id}
                onClick={() => onSelectChannel(channel.id)}
                className={`w-full flex items-center px-2 py-1.5 rounded-md transition-colors ${
                  channel.id === activeChannelId
                    ? isDarkMode
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-100 text-primary-900'
                    : isDarkMode
                    ? 'text-secondary-200 hover:bg-dark-200'
                    : 'text-secondary-700 hover:bg-secondary-100'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-secondary-300 flex items-center justify-center mr-2 text-xs text-white">
                  {channel.name.charAt(0)}
                </div>
                <span className="truncate">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
