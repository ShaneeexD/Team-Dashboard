import { useState, useEffect } from 'react';
import { useTeamStore } from '../store';
import { TeamMember } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import TeamMemberList from '../components/team/TeamMemberList';
import TeamMemberForm from '../components/team/TeamMemberForm';
import { v4 as uuidv4 } from 'uuid';

const TeamPage = () => {
  const { members, addMember, updateMember, deleteMember } = useTeamStore();
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const { isDarkMode } = useTheme();

  // Generate mock team members if none exist
  useEffect(() => {
    if (members.length === 0) {
      const mockMembers = [
        {
          id: uuidv4(),
          displayName: 'John Doe',
          email: 'john.doe@example.com',
          photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
          role: 'admin' as const,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          department: 'Engineering',
          position: 'Senior Developer',
        },
        {
          id: uuidv4(),
          displayName: 'Jane Smith',
          email: 'jane.smith@example.com',
          photoURL: 'https://randomuser.me/api/portraits/women/2.jpg',
          role: 'member' as const,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          department: 'Design',
          position: 'UI/UX Designer',
        },
        {
          id: uuidv4(),
          displayName: 'Michael Johnson',
          email: 'michael.johnson@example.com',
          photoURL: 'https://randomuser.me/api/portraits/men/3.jpg',
          role: 'member' as const,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          department: 'Product',
          position: 'Product Manager',
        },
        {
          id: uuidv4(),
          displayName: 'Emily Davis',
          email: 'emily.davis@example.com',
          photoURL: 'https://randomuser.me/api/portraits/women/4.jpg',
          role: 'member' as const,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          department: 'Marketing',
          position: 'Marketing Specialist',
        },
      ];
      
      useTeamStore.getState().setMembers(mockMembers);
    }
  }, [members.length]);

  // Filter members based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMembers(members);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = members.filter(
        member => 
          member.displayName.toLowerCase().includes(lowerCaseSearch) ||
          member.email.toLowerCase().includes(lowerCaseSearch) ||
          member.department.toLowerCase().includes(lowerCaseSearch) ||
          member.position.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredMembers(filtered);
    }
  }, [members, searchTerm]);

  const handleAddMember = (member: Omit<TeamMember, 'id' | 'createdAt' | 'lastActive'>) => {
    const newMember: TeamMember = {
      ...member,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
    
    addMember(newMember);
    setIsAddingMember(false);
  };

  const handleUpdateMember = (member: TeamMember) => {
    updateMember(member.id, {
      ...member,
      lastActive: new Date().toISOString(),
    });
    setEditingMember(null);
    setIsAddingMember(false);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsAddingMember(true);
  };

  const handleDeleteMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      deleteMember(memberId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
          Team Members
        </h1>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsAddingMember(true);
          }}
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          Add Team Member
        </button>
      </div>

      {!isAddingMember && (
        <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300' : 'bg-white'}`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team members..."
              className={`pl-10 w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? 'bg-dark-200 border-dark-100 text-white placeholder-secondary-500 focus:border-primary-500' 
                  : 'bg-white border-secondary-300 focus:border-primary-500'
              } focus:outline-none focus:ring-1 focus:ring-primary-500`}
            />
          </div>
        </div>
      )}

      {isAddingMember ? (
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-dark-300' : 'bg-white'}`}>
          <TeamMemberForm 
            onSubmit={editingMember ? handleUpdateMember : handleAddMember} 
            onCancel={() => {
              setIsAddingMember(false);
              setEditingMember(null);
            }}
            initialValues={editingMember || undefined}
          />
        </div>
      ) : (
        <TeamMemberList 
          members={filteredMembers} 
          onEdit={handleEditMember} 
          onDelete={handleDeleteMember}
        />
      )}
    </div>
  );
};

export default TeamPage;
