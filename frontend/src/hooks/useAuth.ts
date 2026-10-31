import { useState, useEffect, useCallback } from 'react';
import { AuthUser, UserRole, LoginApiResponse } from '../types/auth';

const STORAGE_KEY = 'tas_cargo_user';
const TOKEN_KEY = 'tas_cargo_token';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [simulatedRole, setSimulatedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = (await res.json()) as LoginApiResponse;

      if (res.ok && data.success && data.user) {
        setUser(data.user);
        setSimulatedRole(null);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
        }
        return true;
      } else {
        setAuthError(data.message || "Login yoki parol noto'g'ri");
        return false;
      }
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Server bilan aloqa xatosi');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSimulatedRole(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  // Effective role: If user is SuperAdmin and chose to simulate another role, return simulatedRole
  const effectiveRole: UserRole | null =
    user?.role === 'SUPER_ADMIN' && simulatedRole ? simulatedRole : user?.role ?? null;

  return {
    user,
    effectiveRole,
    simulatedRole,
    setSimulatedRole,
    isLoading,
    authError,
    login,
    logout,
    isAuthenticated: Boolean(user),
  };
}

