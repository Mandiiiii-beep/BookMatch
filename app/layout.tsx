import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BookMatch - Find Your Next Favorite Book',
  description: 'Discover personalized book recommendations and find used copies at great prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}