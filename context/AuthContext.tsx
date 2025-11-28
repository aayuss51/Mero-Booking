import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  register: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('hms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    let id = '';
    let name = email.split('@')[0]; // Default name from email if logging in directly

    // Create a consistent ID based on email for Guests so history is preserved
    if (role === 'GUEST') {
      const sanitizedEmail = email.toLowerCase().replace(/[^a-z0-9]/g, '');
      id = `guest_${sanitizedEmail}`;
    } else if (role === 'ADMIN') {
      id = 'admin1';
      name = 'Administrator';
    } else if (role === 'SUPER_ADMIN') {
      id = 'super_admin1';
      name = 'Super Admin';
    }

    const newUser: User = {
      id,
      name,
      email,
      role
    };
    setUser(newUser);
    localStorage.setItem('hms_user', JSON.stringify(newUser));
  };

  const register = (name: string, email: string, role: UserRole) => {
    let id = '';
    
    if (role === 'GUEST') {
      const sanitizedEmail = email.toLowerCase().replace(/[^a-z0-9]/g, '');
      id = `guest_${sanitizedEmail}`;
    } else {
       id = `user_${Date.now()}`;
    }

    const newUser: User = {
      id,
      name,
      email,
      role
    };
    setUser(newUser);
    localStorage.setItem('hms_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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