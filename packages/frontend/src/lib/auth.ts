// Mock authentication service for Effectcord

import { type AuthUser, type LoginCredentials, type SignupCredentials } from '@/types';
import { mockUsers } from './mock-data';

// Simulated auth state
class AuthService {
  private currentUser: AuthUser | null = null;
  private listeners: ((user: AuthUser | null) => void)[] = [];

  // Subscribe to auth state changes
  subscribe(listener: (user: AuthUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of auth state change
  private notify() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  // Sign in
  async signIn(credentials: LoginCredentials): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In a real app, you'd verify the password here
    // For demo purposes, any password works

    this.currentUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar
    };

    // Store in localStorage for persistence
    localStorage.setItem('effectcord_user', JSON.stringify(this.currentUser));
    
    this.notify();
    return this.currentUser;
  }

  // Sign up
  async signUp(credentials: SignupCredentials): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      username: credentials.username,
      avatar: undefined
    };

    this.currentUser = newUser;

    // Store in localStorage for persistence
    localStorage.setItem('effectcord_user', JSON.stringify(this.currentUser));
    
    this.notify();
    return this.currentUser;
  }

  // Sign out
  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('effectcord_user');
    this.notify();
  }

  // Initialize auth state from localStorage
  init(): void {
    const stored = localStorage.getItem('effectcord_user');
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored) as AuthUser;
        this.notify();
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('effectcord_user');
      }
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<Pick<AuthUser, 'username' | 'avatar'>>): Promise<AuthUser> {
    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    this.currentUser = { ...this.currentUser, ...updates };
    
    // Store in localStorage
    localStorage.setItem('effectcord_user', JSON.stringify(this.currentUser));
    
    this.notify();
    return this.currentUser;
  }
}

export const authService = new AuthService();

// Initialize auth on module load
authService.init();
