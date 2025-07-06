'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PublicOnlyLayout({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/dashboard'); 
        }
    }, [status, router]);

    if (status === 'loading') return <div>Loading...</div>;

    if (status === 'unauthenticated') {
        return <>{children}</>;
    }

    return null;
}
