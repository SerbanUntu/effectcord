import { useState, useEffect } from 'react';
import { type AuthUser } from '@/types';
import { authService } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);

    // Subscribe to auth changes
    const unsubscribe = authService.subscribe((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user
  };
}
