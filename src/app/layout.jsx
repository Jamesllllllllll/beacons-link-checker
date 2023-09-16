'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import Header from './components/Header';
import { Provider } from './components/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Check Your Beacons Links',
  description: 'Check for broken links on your Beacons profile page',
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {/* <Header /> */}
          <main className="flex min-h-screen justify-center py-4 sm:py-24 gap-12">
            <Paper
              variant="outlined"
              color="neutral"
              className="flex flex-col items-center justify-start rounded-3xl shadow-lg px-2 py-16 gap-8 bg-gradient-to-b from-gray-50 to-slate-50 w-11/12 sm:p-16 lg:w-3/4"
              sx={{ p: 4 }}
            >
              {children}
              <Box className="self-end mt-auto m-4">
                {pathname === '/privacy' ? (
                  <Link href="/">
                    <Button>Close</Button>
                  </Link>
                ) : (
                  <Link href="privacy">
                    <Button>Privacy</Button>
                  </Link>
                )}
              </Box>
            </Paper>
          </main>
        </Provider>
      </body>
    </html>
  );
}
