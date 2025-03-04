# Team Dashboard

A modern team collaboration platform with tasks, chat features, and event management.

## Features

- **Task Management**: Create, assign, and track tasks with priority levels and status updates
- **Chat System**: Group chat channels and private messaging
- **Calendar & Events**: Schedule and manage team events and meetings
- **Team Directory**: View and connect with team members
- **Dashboard**: Get a quick overview of your tasks, upcoming events, and recent activity

## Tech Stack

- React 19 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- React Router for navigation
- Zustand for state management
- Firebase for backend services (authentication, database, storage)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/team-dashboard.git
cd team-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and update the configuration:
   - Go to the Firebase console and create a new project
   - Enable Authentication, Firestore, and Storage
   - Update the Firebase configuration in `src/services/firebase.ts`

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Demo Login

For demo purposes, you can sign in with:
- Email: demo@example.com
- Password: password

## Project Structure

- `/src/components`: UI components
- `/src/pages`: Page components
- `/src/store`: State management
- `/src/types`: TypeScript interfaces
- `/src/services`: API and service integrations
- `/src/hooks`: Custom hooks
- `/src/utils`: Utility functions

## License

This project is licensed under the MIT License.
