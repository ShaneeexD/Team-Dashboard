import React from 'react';
import { TeamMember } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface TeamMemberListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (memberId: string) => void;
}

const TeamMemberList: React.FC<TeamMemberListProps> = ({ members, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();

  const getRoleBadgeColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'admin':
        return isDarkMode 
          ? 'bg-purple-900/30 text-purple-300 border-purple-700' 
          : 'bg-purple-100 text-purple-800 border-purple-200';
      case 'member':
        return isDarkMode 
          ? 'bg-blue-900/30 text-blue-300 border-blue-700' 
          : 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return isDarkMode 
          ? 'bg-gray-800 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (members.length === 0) {
    return (
      <div className={`p-8 text-center rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300 text-secondary-300' : 'bg-white text-secondary-500'}`}>
        <p>No team members found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map(member => (
        <div 
          key={member.id} 
          className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300 border border-dark-100' : 'bg-white border border-secondary-100'}`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={member.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.displayName)}&background=random`} 
                alt={member.displayName} 
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-medium truncate ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
                  {member.displayName}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-md border ${getRoleBadgeColor(member.role)}`}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
              </div>
              <p className={`text-sm truncate ${isDarkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>
                {member.email}
              </p>
              <div className={`mt-2 text-sm ${isDarkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>
                <p>{member.position}</p>
                <p>{member.department}</p>
              </div>
              <div className={`mt-2 text-xs ${isDarkMode ? 'text-secondary-500' : 'text-secondary-500'}`}>
                Joined: {formatDate(member.createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={() => onEdit(member)}
              className={`px-3 py-1 rounded-md text-sm ${
                isDarkMode 
                  ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(member.id)}
              className={`px-3 py-1 rounded-md text-sm ${
                isDarkMode 
                  ? 'bg-red-900/30 text-red-300 hover:bg-red-900/50' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
