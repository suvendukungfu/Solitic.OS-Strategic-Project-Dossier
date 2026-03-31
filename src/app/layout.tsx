import './globals.css';
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Blog CMS | Premium Content Management',
  description: 'A production-grade Blog CMS built with Next.js and Prisma.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmSans.variable} ${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
