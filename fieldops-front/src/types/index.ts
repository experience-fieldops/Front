export type UserRole = 'ADMIN' | 'MANAGER' | 'INSPECTOR' | 'REVIEWER';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaces para dados de exemplo
export interface Task {
  id: number;
  title: string;
  description: string;
  technician: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'review';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  client: string;
  location: string;
  createdAt: string;
}

export interface Technician {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string[];
  completedTasks: number;
  pendingTasks: number;
  rating: number;
  status: 'available' | 'busy' | 'offline';
  lastActive: string;
}

export interface Inspection {
  id: number;
  title: string;
  technician: string;
  client: string;
  location: string;
  completedDate: string;
  status: 'pending_review' | 'approved' | 'rejected';
  itemsTotal: number;
  itemsCompleted: number;
  hasIssues: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ScheduledInspection {
  id: number;
  title: string;
  client: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  technician: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
}