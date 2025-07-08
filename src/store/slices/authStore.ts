import { User } from '@/types/user';
import { SigninSchema } from '@/validation/signInValidation';
import { SignupSchema } from '@/validation/signUpValidation';
import { signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

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
        toast.error(res.error || "Signin failed");
      } else {
        set({ error: null });
        toast.success('Signin successful');
      }
    } catch (err) {
      set({ error: 'Something went wrong, please try again later', user: null });
      toast.error('Signin failed, please try again later');
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
        toast.error(data.error || 'Signup failed');
      }
      if (data.user) {
        set({ error: null });
        toast.success('Signup successful');
      }
    } catch (err) {
      set({ error: 'Something went wrong, please try again later', user: null });
      toast.error('Signup failed, please try again later');
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
      toast.error('Logout failed, please try again later');
    } finally {
      set({ isUserLoading: false });
    }
  }
});
