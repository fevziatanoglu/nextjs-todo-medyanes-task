'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setUser({
        id: (session.user as { id?: string; }).id ?? '',
        email: session.user?.email ?? '',
        name: session.user?.name ?? '',
      });
    }
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [session, status, router, setUser]);

  if (status === 'loading') return <div>Loading...</div>; 

  if (status === 'authenticated' && session) {
    return <>{children}</>;
  }

  return null;
}
