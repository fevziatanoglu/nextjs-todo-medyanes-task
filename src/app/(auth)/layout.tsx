'use client';

import useRootStore from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingPage from '../loading';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {setUser} = useRootStore();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setUser({
        id: session.user?.id ?? '',
        email: session.user?.email ?? '',
        name: session.user?.name ?? '',
      });
    }
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [session, status, router, setUser]);

  if (status === 'loading') return <LoadingPage />; 

  if (status === 'authenticated' && session) {
    return <>{children}</>;
  }

  return null;
}
