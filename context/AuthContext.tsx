'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  branchId?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('ccw_auth_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        }
      } catch (err) {
        localStorage.removeItem('ccw_auth_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (emailOrPhone: string, password: string) => {
    const res = await api.login({ emailOrPhone, password });
    if (res.success && res.token) {
      localStorage.setItem('ccw_auth_token', res.token);
      setUser(res.user);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    const res = await api.register({ name, email, phone, password });
    if (res.success && res.token) {
      localStorage.setItem('ccw_auth_token', res.token);
      setUser(res.user);
    }
  };

  const logout = () => {
    localStorage.removeItem('ccw_auth_token');
    setUser(null);
    window.location.href = '/';
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN' || user?.role === 'BRANCH_MANAGER';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

