'use client';

import { SessionProvider } from 'next-auth/react';
import './globals.css'
import Navbar from '@/components/navbar/navbar';
import Modal from '@/components/modal/modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <Navbar />
          <Modal/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
