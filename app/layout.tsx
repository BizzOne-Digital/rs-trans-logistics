import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Blue River Logistics | Canada & USA Trucking Services',
  description:
    'Full-service trucking company based in Surrey, BC, providing dry van, reefer, flatbed, step deck, container, and intermodal freight services between Canada and the USA.',
  keywords:
    'Canada USA trucking, Surrey BC trucking, cross-border trucking, freight transportation, Blue River Logistics',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.png',
    apple: [{ url: '/favicon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Blue River Logistics | Canada & USA Trucking Services',
    description: 'Full-service trucking company based in Surrey, BC, providing freight services between Canada and the USA.',
    type: 'website',
    images: [{ url: '/favicon.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#ffffff',
              border: '1px solid rgba(37, 99, 235, 0.3)',
            },
          }}
        />
      </body>
    </html>
  );
}
