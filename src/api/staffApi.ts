import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiResponse, MutationArgs } from '../lib/types';
import apiClient from '../lib/apiClient';

export interface StaffRole {
  id: string;
  name: string;
  createdAt: string;
}

export const staffRolesQueryKey = 'staffRolesQueryKey';

export const useStaffRole = () => {
  return useQuery({
    queryKey: [staffRolesQueryKey],
    queryFn: async () => {
      const axiosData: ApiResponse<Staff[]> = (await apiClient.get('/staff/roles')).data;
      const staffRoles = axiosData.payload;
      return staffRoles;
    },
    initialData: [],
    refetchInterval: 10000,
  });
};

interface CreateStaffRoleMutationData {
  name: string;
  permissions: string[];
}

export const useCreateStaffRoleMutation = ({ onError, onSuccess }: MutationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateStaffRoleMutationData) => {
      const axiosData: ApiResponse<StaffRole> = (await apiClient.post('/staff/roles', payload)).data;

      return axiosData;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [staffRolesQueryKey] });
    },
    onError: (error) => {
      console.log(error);
      onError(error.message);
    },
    onSuccess: (data) => {
      onSuccess(data.message);
    },
  });
};

export interface Staff {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber: string;
  photoUrl: string;
  role: StaffRole;
  isActive: boolean;
  createdAt: string;
}

export const staffMembersQueryKey = 'staffMembersQueryKey';

export const useStaffMembers = () => {
  return useQuery({
    queryKey: [staffMembersQueryKey],
    queryFn: async () => {
      const axiosData: ApiResponse<Staff[]> = (await apiClient.get('/staff')).data;
      const staff = axiosData.payload;
      return staff;
    },
    initialData: [],
    refetchInterval: 10000,
  });
};

interface CreateStaffMemberMutationData {
  name: string;
  phoneNumber: string;
  password: string;
  roleId: string;
  photo: File;
}

export const useCreateStaffMemberMutation = ({ onError, onSuccess }: MutationArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateStaffMemberMutationData) => {
      const formData = new FormData();

      formData.append('name', payload.name);
      formData.append('phoneNumber', payload.phoneNumber);
      formData.append('password', payload.password);
      formData.append('roleId', payload.roleId);
      formData.append('photo', payload.photo);

      const axiosData: ApiResponse<Staff> = (
        await apiClient.post('/staff', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;
      return axiosData;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [staffMembersQueryKey] });
    },
    onError: (error) => {
      console.log(error);
      onError(error.message);
    },
    onSuccess: (data) => {
      onSuccess(data.message);
    },
  });
};
