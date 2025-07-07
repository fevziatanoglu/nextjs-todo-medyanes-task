import { User } from '@/types/user';
import { SigninSchema } from '@/validation/signInValidation';
import { SignupSchema } from '@/validation/signUpValidation';
import { signIn, signOut } from 'next-auth/react';

export type AuthStore = {
  user: User | null;
  error: string | null;
  isUserLoading: boolean;
  setUser: (user: User | null) => void;
  signInFetch: (userData: SigninSchema) => Promise<void>;
  signupFetch: (userData: SignupSchema) => Promise<void>;
  logoutFetch: () => Promise<void>;
};

export const createAuthSlice = (set: any, get: any): AuthStore => ({
  user: null,
  error: null,
  isUserLoading: false,
  setUser: (user) => set({ user }),
  signInFetch: async (userData) => {
    set({ isUserLoading: true, error: null });
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
      set({ isUserLoading: false });
      get().closeModal()

    }
  },
  signupFetch: async (userData) => {
    set({ isUserLoading: true, error: null });
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
      set({ isUserLoading: false });
      get().closeModal()
    }
  },
  logoutFetch: async () => {
    set({ isUserLoading: true, error: null });
    try {
      await signOut({ redirect: false });
      set({ user: null, error: null });
    } catch (err) {
      set({ error: 'Something went wrong, please try again later', user: null });
    } finally {
      set({ isUserLoading: false });
    }
  }
});
