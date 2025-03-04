import React, { useState, useRef, useEffect } from 'react';
import { Channel, Message } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { FaHashtag, FaLock, FaPaperPlane, FaSmile } from 'react-icons/fa';
import { format, isToday, isYesterday } from 'date-fns';

interface ChatAreaProps {
  channel: Channel;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channel, messages, onSendMessage }) => {
  const { isDarkMode } = useTheme();
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Group messages by date and sender
  const groupedMessages = messages.reduce<{
    date: string;
    groups: {
      userId: string;
      userName: string;
      messages: Message[];
    }[];
  }[]>((acc, message) => {
    const messageDate = new Date(message.createdAt);
    let dateStr: string;
    
    if (isToday(messageDate)) {
      dateStr = 'Today';
    } else if (isYesterday(messageDate)) {
      dateStr = 'Yesterday';
    } else {
      dateStr = format(messageDate, 'MMMM d, yyyy');
    }
    
    // Find or create date group
    let dateGroup = acc.find(group => group.date === dateStr);
    if (!dateGroup) {
      dateGroup = { date: dateStr, groups: [] };
      acc.push(dateGroup);
    }
    
    // Find or create user group within date group
    let userGroup = dateGroup.groups.find(group => group.userId === message.userId);
    if (!userGroup) {
      // Mock user names based on userId
      let userName = 'Unknown User';
      if (message.userId === 'user123') {
        userName = 'John Doe (You)';
      } else if (message.userId === 'user456') {
        userName = 'Jane Smith';
      } else if (message.userId === 'user789') {
        userName = 'Michael Johnson';
      }
      
      userGroup = { userId: message.userId, userName, messages: [] };
      dateGroup.groups.push(userGroup);
    }
    
    userGroup.messages.push(message);
    return acc;
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Channel header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-dark-100' : 'border-secondary-200'
      }`}>
        <div className="flex items-center">
          {channel.type === 'public' ? (
            <FaHashtag className={`mr-2 ${
              isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
            }`} />
          ) : (
            <FaLock className={`mr-2 ${
              isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
            }`} />
          )}
          <h2 className="text-lg font-semibold">
            {channel.name}
          </h2>
        </div>
        {channel.description && (
          <p className={`mt-1 text-sm ${
            isDarkMode ? 'text-secondary-400' : 'text-secondary-600'
          }`}>
            {channel.description}
          </p>
        )}
      </div>
      
      {/* Messages area */}
      <div className={`flex-1 overflow-y-auto p-4 ${
        isDarkMode ? 'bg-dark-400' : 'bg-secondary-50'
      }`}>
        {groupedMessages.length > 0 ? (
          groupedMessages.map((dateGroup, dateIndex) => (
            <div key={`date-${dateIndex}`} className="mb-6">
              <div className="flex items-center mb-4">
                <div className={`flex-grow border-t ${
                  isDarkMode ? 'border-dark-100' : 'border-secondary-200'
                }`}></div>
                <div className={`mx-4 text-xs font-medium ${
                  isDarkMode ? 'text-secondary-400' : 'text-secondary-500'
                }`}>
                  {dateGroup.date}
                </div>
                <div className={`flex-grow border-t ${
                  isDarkMode ? 'border-dark-100' : 'border-secondary-200'
                }`}></div>
              </div>
              
              {dateGroup.groups.map((userGroup, userIndex) => (
                <div key={`user-${userIndex}`} className="mb-4">
                  <div className="flex items-start mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium mr-2">
                      {userGroup.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-baseline">
                        <span className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-secondary-900'
                        }`}>
                          {userGroup.userName}
                        </span>
                        <span className={`ml-2 text-xs ${
                          isDarkMode ? 'text-secondary-500' : 'text-secondary-500'
                        }`}>
                          {format(new Date(userGroup.messages[0].createdAt), 'h:mm a')}
                        </span>
                      </div>
                      
                      <div className="space-y-1 mt-1">
                        {userGroup.messages.map((message) => (
                          <div 
                            key={message.id} 
                            className={`pl-0 ${
                              isDarkMode ? 'text-secondary-200' : 'text-secondary-800'
                            }`}
                          >
                            {message.content}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className={`text-center ${
              isDarkMode ? 'text-secondary-500' : 'text-secondary-500'
            }`}>
              <p className="mb-2">No messages yet</p>
              <p className="text-sm">Be the first to send a message!</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'border-dark-100' : 'border-secondary-200'
      }`}>
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message ${channel.type === 'public' ? '#' : ''}${channel.name}`}
              className={`w-full py-2 px-4 pr-10 rounded-md ${
                isDarkMode
                  ? 'bg-dark-200 text-white placeholder-secondary-400 border-dark-100'
                  : 'bg-white text-secondary-900 placeholder-secondary-500 border-secondary-200'
              } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            <button
              type="button"
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-secondary-400 hover:text-secondary-300' : 'text-secondary-500 hover:text-secondary-700'
              }`}
            >
              <FaSmile />
            </button>
          </div>
          <button
            type="submit"
            className={`ml-2 p-2 rounded-md ${
              messageInput.trim()
                ? isDarkMode
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
                : isDarkMode
                ? 'bg-dark-200 text-secondary-500 cursor-not-allowed'
                : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'
            }`}
            disabled={!messageInput.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
