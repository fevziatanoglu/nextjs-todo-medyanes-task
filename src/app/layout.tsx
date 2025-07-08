import './globals.css'
import Navbar from '@/components/navbar/navbar';
import Modal from '@/components/modal/modal';
import ClientProviders from '@/components/clientProvider/clientProvider';

export const metadata = {
  title: "Todo App",
  description: "Organize your tasks and boost your productivity",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Todo App",
    description: "Organize your tasks and boost your productivity",
    url: "https://nextjs-todo-medyanes.vercel.app",
    siteName: "Todo App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ClientProviders>
        <Navbar />
        <Modal />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
