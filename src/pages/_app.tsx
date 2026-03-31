import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// This _app.tsx wraps all legacy Pages Router pages with SessionProvider
// so that the Navbar (which uses useSession) works correctly.
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
