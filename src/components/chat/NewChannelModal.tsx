import React, { useState } from 'react';
import { Channel } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { FaTimes } from 'react-icons/fa';

interface NewChannelModalProps {
  onClose: () => void;
  onCreateChannel: (channelData: Omit<Channel, 'id' | 'createdAt' | 'createdById'>) => void;
}

const NewChannelModal: React.FC<NewChannelModalProps> = ({ onClose, onCreateChannel }) => {
  const { isDarkMode } = useTheme();
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [channelType, setChannelType] = useState<'public' | 'private'>('public');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!channelName.trim()) {
      setError('Channel name is required');
      return;
    }
    
    onCreateChannel({
      name: channelName.trim(),
      description: channelDescription.trim(),
      type: channelType,
      members: ['user123'], // Current user ID
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className={`p-6 rounded-lg shadow-lg max-w-md w-full ${
          isDarkMode ? 'bg-dark-300 text-white' : 'bg-white text-secondary-900'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Create New Channel</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              isDarkMode 
                ? 'hover:bg-dark-200 text-secondary-400 hover:text-secondary-300' 
                : 'hover:bg-secondary-100 text-secondary-500 hover:text-secondary-700'
            }`}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="channelName" 
              className={`block mb-1 font-medium ${
                isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
              }`}
            >
              Channel Name
            </label>
            <input
              id="channelName"
              type="text"
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
                setError('');
              }}
              placeholder="e.g. marketing"
              className={`w-full p-2 rounded-md ${
                isDarkMode
                  ? 'bg-dark-200 text-white placeholder-secondary-500 border-dark-100'
                  : 'bg-white text-secondary-900 placeholder-secondary-400 border-secondary-300'
              } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label 
              htmlFor="channelDescription" 
              className={`block mb-1 font-medium ${
                isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
              }`}
            >
              Description (optional)
            </label>
            <input
              id="channelDescription"
              type="text"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              placeholder="What's this channel about?"
              className={`w-full p-2 rounded-md ${
                isDarkMode
                  ? 'bg-dark-200 text-white placeholder-secondary-500 border-dark-100'
                  : 'bg-white text-secondary-900 placeholder-secondary-400 border-secondary-300'
              } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
          </div>
          
          <div className="mb-6">
            <label 
              className={`block mb-2 font-medium ${
                isDarkMode ? 'text-secondary-300' : 'text-secondary-700'
              }`}
            >
              Channel Type
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="public"
                  type="radio"
                  name="channelType"
                  checked={channelType === 'public'}
                  onChange={() => setChannelType('public')}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label 
                  htmlFor="public" 
                  className={`ml-2 ${
                    isDarkMode ? 'text-white' : 'text-secondary-900'
                  }`}
                >
                  Public - Anyone in the team can join
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="private"
                  type="radio"
                  name="channelType"
                  checked={channelType === 'private'}
                  onChange={() => setChannelType('private')}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label 
                  htmlFor="private" 
                  className={`ml-2 ${
                    isDarkMode ? 'text-white' : 'text-secondary-900'
                  }`}
                >
                  Private - Only invited people can join
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
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
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChannelModal;
