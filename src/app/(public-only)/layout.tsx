'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingPage from '../loading';

export default function PublicOnlyLayout({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/home'); 
        }
    }, [status, router]);

    if (status === 'loading') return <LoadingPage />;

    if (status === 'unauthenticated') {
        return <>{children}</>;
    }

    return null;
}
