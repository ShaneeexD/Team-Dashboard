export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: 'admin' | 'member';
  createdAt: string;
  lastActive: string;
}

export interface TeamMember extends User {
  department: string;
  position: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assigneeId: string;
  createdById: string;
  tags: string[];
  attachments?: Attachment[];
  comments?: Comment[];
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
  uploadedById: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private';
  createdAt: string;
  createdById: string;
  members: string[];
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  channelId: string;
  threadId?: string;
  attachments?: Attachment[];
  reactions?: Reaction[];
  isPinned?: boolean;
  mentions?: string[];
}

export interface Reaction {
  userId: string;
  emoji: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location?: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  attendees: string[];
  isAllDay?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
  color?: string;
}

export interface Notification {
  id: string;
  type: 'message' | 'task' | 'event' | 'system';
  content: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
  linkTo?: string;
}
