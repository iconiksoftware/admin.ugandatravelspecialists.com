import { StaffRole } from './enums';

export interface ApiResponse<T> {
  success: boolean;
  payload: T;
  message?: string;
}

export interface MutationArgs {
  onError: (message: string | null | undefined) => void;
  onSuccess: (message: string | null | undefined) => void;
}

export interface AuditLog {
  id: string;
  performedBy: {
    id: string;
    userAccount: {
      id: string;
      name: string;
      phoneNumber: string;
      photoUrl: string;
    };
  };
  actionDescription: string;
  affectedResourceType?: string;
  affectedResourceId?: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber: string;
  photoUrl: string;
  roles: StaffRole[];
  staffId: string;
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber: string;
  photoUrl: string;
  roles: StaffRole[];
  isActive: boolean;
  createdAt: string;
}
