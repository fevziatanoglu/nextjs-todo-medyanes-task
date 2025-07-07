'use client';

import { SessionProvider } from 'next-auth/react';
import './globals.css'
import Navbar from '@/components/navbar/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
