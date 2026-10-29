/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useMemo, useState } from 'react';
import {
  getStoredUser,
  getUserRolePath,
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
} from '../services/mockAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isReady] = useState(true);

  const login = async (email, password, role) => {
    const authenticatedUser = loginUser(email, password, role);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const register = async (name, email, password, role) => {
    const registeredUser = registerUser(name, email, password, role);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isReady,
      login,
      register,
      logout,
      rolePath: getUserRolePath,
    }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
