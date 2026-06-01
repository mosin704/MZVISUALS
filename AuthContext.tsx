import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  userType: 'admin' | 'user' | null;
  loginTime: number | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (type: 'admin' | 'user') => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'mz_auth_session';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed: AuthState = JSON.parse(stored);
        if (parsed.loginTime && Date.now() - parsed.loginTime < SESSION_DURATION) {
          return parsed;
        }
      }
    } catch {}
    return { isLoggedIn: false, userType: null, loginTime: null };
  });

  const login = useCallback((type: 'admin' | 'user') => {
    const newAuth: AuthState = {
      isLoggedIn: true,
      userType: type,
      loginTime: Date.now(),
    };
    setAuth(newAuth);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newAuth));
  }, []);

  const logout = useCallback(() => {
    setAuth({ isLoggedIn: false, userType: null, loginTime: null });
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  // Auto logout after session expires
  useEffect(() => {
    if (!auth.isLoggedIn || !auth.loginTime) return;
    const remaining = SESSION_DURATION - (Date.now() - auth.loginTime);
    if (remaining <= 0) {
      logout();
      return;
    }
    const timer = setTimeout(logout, remaining);
    return () => clearTimeout(timer);
  }, [auth.isLoggedIn, auth.loginTime, logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin: auth.userType === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
