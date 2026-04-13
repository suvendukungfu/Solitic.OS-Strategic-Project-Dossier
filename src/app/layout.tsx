import './globals.css';
import { 
  Inter, 
  Playfair_Display, 
  DM_Sans, 
  DM_Serif_Display, 
  Cormorant_Garamond,
  Libre_Baskerville,
  Merriweather,
  Poppins,
  Lato,
  Open_Sans,
  Montserrat,
  JetBrains_Mono,
  Fira_Code
} from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

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

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif-display',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-baskerville',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
});

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jetbrains',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono-fira',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl('/apple-touch-icon.png'),
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl('/apple-touch-icon.png')],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '512x512' }],
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" style={{ backgroundColor: '#0f172a' }}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `html, body { background-color: #0f172a !important; }` }} />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} ${inter.variable} ${dmSerif.variable} ${cormorant.variable} ${libreBaskerville.variable} ${merriweather.variable} ${poppins.variable} ${lato.variable} ${openSans.variable} ${montserrat.variable} ${jetbrainsMono.variable} ${firaCode.variable} font-sans bg-background text-foreground antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
