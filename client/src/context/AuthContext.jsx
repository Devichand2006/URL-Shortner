import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authApi.getMe();
        setUser(data.user);
      } catch {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [token]);

  const handleAuthSuccess = (authData) => {
    localStorage.setItem('token', authData.token);
    setToken(authData.token);
    setUser(authData.user);
  };

  const signup = async (name, email, password) => {
    const data = await authApi.signup(name, email, password);
    handleAuthSuccess(data);
    return data;
  };

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    handleAuthSuccess(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
