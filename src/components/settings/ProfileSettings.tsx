import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuthStore } from '../../store';

const ProfileSettings = () => {
  const { isDarkMode } = useTheme();
  const { user, updateUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    bio: 'Product Manager with 5+ years of experience in SaaS products.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        updateUser({
          ...user,
          displayName: formData.displayName,
          email: formData.email,
          photoURL: formData.photoURL,
        });
      }
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-secondary-900'}`}>
          Profile Settings
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-dark-200 text-secondary-300 hover:bg-dark-100'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-dark-200 text-secondary-300 hover:bg-dark-100'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-500">
            <img
              src={formData.photoURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div className="flex flex-col space-y-2 w-full">
              <label 
                htmlFor="photoURL" 
                className={`text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className={`px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-dark-200 text-white border-dark-100'
                    : 'bg-white text-secondary-900 border-secondary-300'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="flex-1">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="displayName" 
                  className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-dark-200 text-white border-dark-100'
                      : 'bg-white text-secondary-900 border-secondary-300'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70`}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-dark-200 text-white border-dark-100'
                      : 'bg-white text-secondary-900 border-secondary-300'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70`}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="phone" 
                  className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-dark-200 text-white border-dark-100'
                      : 'bg-white text-secondary-900 border-secondary-300'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70`}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="location" 
                  className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`mt-1 block w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-dark-200 text-white border-dark-100'
                      : 'bg-white text-secondary-900 border-secondary-300'
                  } border focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70`}
                />
              </div>
            </div>
            
            <div>
              <label 
                htmlFor="bio" 
                className={`block text-sm font-medium ${isDarkMode ? 'text-secondary-300' : 'text-secondary-700'}`}
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 block w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-dark-200 text-white border-dark-100'
                    : 'bg-white text-secondary-900 border-secondary-300'
                } border focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-70`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
