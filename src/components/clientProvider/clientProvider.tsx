"use client";
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer />
    </SessionProvider>
  );
}
