import React, { createContext, useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { ApiResponse, User } from '../lib/types';
import apiClient from '../lib/apiClient';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    retry: false,
    queryFn: async () => {
      const axiosResponse: ApiResponse<User> = (await apiClient.get('/auth/staff')).data;
      return axiosResponse.payload;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setUser(data);
      }

      setLoading(false);
    }
  }, [data, isLoading]);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
