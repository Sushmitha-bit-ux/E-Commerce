import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nova_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default to demo customer logged-in for instant pleasant experience
    return {
      id: "demo-user",
      name: "Sophia Davis",
      email: "demo@example.com",
      role: "CUSTOMER",
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace, Springfield, OR 97477"
    };
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem('nova_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nova_auth_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiService.login(email, password);
      const userData = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role,
        phone: res.phone,
        address: res.address
      };
      setUser(userData);
      addToast(`Welcome back, ${res.name}!`, 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await apiService.register(userData);
      const newUserData = {
        id: res.id,
        name: res.name,
        email: res.email,
        role: res.role,
        phone: res.phone,
        address: res.address
      };
      setUser(newUserData);
      addToast(`Account created successfully! Welcome, ${res.name}.`, 'success');
      return { success: true };
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    const name = user?.name || 'User';
    setUser(null);
    addToast(`Goodbye, ${name}. You have been logged out.`, 'info');
  };

  const demoLogin = async (role = 'CUSTOMER') => {
    if (role === 'ADMIN') {
      return login('admin@example.com', 'admin123');
    }
    return login('demo@example.com', 'demo123');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, demoLogin, isAuthenticated: !!user }}>
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
