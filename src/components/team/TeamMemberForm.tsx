import React, { useState, useEffect } from 'react';
import { TeamMember } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface TeamMemberFormProps {
  onSubmit: (member: TeamMember | Omit<TeamMember, 'id' | 'createdAt' | 'lastActive'>) => void;
  onCancel: () => void;
  initialValues?: TeamMember;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ onSubmit, onCancel, initialValues }) => {
  const { isDarkMode } = useTheme();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('member');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with initial values if provided (for editing)
  useEffect(() => {
    if (initialValues) {
      setDisplayName(initialValues.displayName);
      setEmail(initialValues.email);
      setPhotoURL(initialValues.photoURL || '');
      setRole(initialValues.role);
      setDepartment(initialValues.department);
      setPosition(initialValues.position);
    }
  }, [initialValues]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!displayName.trim()) {
      newErrors.displayName = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const memberData = {
      ...(initialValues ? { id: initialValues.id } : {}),
      displayName,
      email,
      photoURL: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`,
      role,
      department,
      position,
      ...(initialValues ? { 
        createdAt: initialValues.createdAt,
        lastActive: new Date().toISOString()
      } : {})
    };
    
    onSubmit(memberData as any);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : ''}`}>
        {initialValues ? 'Edit Team Member' : 'Add New Team Member'}
      </h2>
      
      <div>
        <label 
          htmlFor="displayName" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Full Name
        </label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          placeholder="John Doe"
        />
        {errors.displayName && <p className="mt-1 text-sm text-red-500">{errors.displayName}</p>}
      </div>
      
      <div>
        <label 
          htmlFor="email" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          placeholder="john.doe@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div>
        <label 
          htmlFor="photoURL" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Photo URL (optional)
        </label>
        <input
          type="text"
          id="photoURL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
          placeholder="https://example.com/photo.jpg"
        />
        <p className={`mt-1 text-xs ${isDarkMode ? 'text-secondary-400' : 'text-secondary-500'}`}>
          Leave blank to use a generated avatar
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="department" 
            className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
            placeholder="Engineering"
          />
          {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
        </div>
        
        <div>
          <label 
            htmlFor="position" 
            className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
                : 'bg-white border-secondary-300 focus:border-primary-500'
            } focus:outline-none focus:ring-1 focus:ring-primary-500`}
            placeholder="Senior Developer"
          />
          {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
        </div>
      </div>
      
      <div>
        <label 
          htmlFor="role" 
          className={`block mb-1 font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
        >
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as TeamMember['role'])}
          className={`w-full px-3 py-2 rounded-md border ${
            isDarkMode 
              ? 'bg-dark-200 border-dark-100 text-white focus:border-primary-500' 
              : 'bg-white border-secondary-300 focus:border-primary-500'
          } focus:outline-none focus:ring-1 focus:ring-primary-500`}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
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
          className={`px-4 py-2 rounded-md ${
            isDarkMode 
              ? 'bg-primary-600 hover:bg-primary-700 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {initialValues ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
