import { User } from '@/types/user';
import { SigninSchema } from '@/validation/signInValidation';
import { SignupSchema } from '@/validation/signUpValidation';
import { signIn, signOut } from 'next-auth/react';
import { create } from 'zustand';
import Router from 'next/router';

type AuthStore = {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signInFetch: (userData: SigninSchema) => Promise<void>;
  signupFetch: (userData: SignupSchema) => Promise<void>;
  logoutFetch: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  error: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  signInFetch: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await signIn('credentials', {
        ...userData,
        redirect: false,
      });
      if (res?.error) {
        set({ error: res.error, user: null });
      } else {
        set({ error: null });
      }
    } catch (err) {
      set({ error: 'Something went wrong, please try again later', user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  signupFetch: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.error || 'Signup failed', user: null });
      }
      if (data.user) {
        set({ error: null });
      }
    } catch (err) {
      set({ error: 'Something went wrong, please try again later', user: null });
    } finally {
      set({ isLoading: false });
    }
  },
  logoutFetch: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut({ redirect: false });
      set({ user: null, error: null });
    } catch (err) {
      console.error('Logout error:', err);
      set({ error: 'Something went wrong, please try again later', user: null });
    } finally {
      set({ isLoading: false });
    }
  }
}));
