import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginSchool } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [school,  setSchool]  = useState(null);
  const [token,   setToken]   = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    try {
      const savedUser   = localStorage.getItem('user');
      const savedSchool = localStorage.getItem('school');
      if (savedUser   && savedUser   !== 'undefined') setUser(JSON.parse(savedUser));
      if (savedSchool && savedSchool !== 'undefined') setSchool(JSON.parse(savedSchool));
    } catch (e) {
      localStorage.removeItem('user');
      localStorage.removeItem('school');
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginSchool({ email, password });
      const { token, user, school } = res.data;

      localStorage.setItem('token',  token);
      localStorage.setItem('user',   JSON.stringify(user));
      localStorage.setItem('school', JSON.stringify(school));

      setToken(token);
      setUser(user);
      setSchool(school);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('school');
    setToken(null);
    setUser(null);
    setSchool(null);
  };

  return (
    <AuthContext.Provider value={{
      user, school, token, loading, error, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);