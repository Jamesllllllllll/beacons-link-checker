import './globals.css';
import { Inter } from 'next/font/google';
import Paper from '@mui/material/Paper';
import Header from './components/Header';
import { Provider } from './components/provider';
import { ThemeProvider } from '@mui/material/styles';
import BottomNavigation from './components/BottomNavigation';
import { purpleTheme } from './components/purpleTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Check Your Beacons Links',
  description: 'Check for broken links on your Beacons profile page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider theme={purpleTheme}>
        <body className={inter.className}>
          <Provider>
            {/* <Header /> */}
            <div className="flex min-h-screen justify-center py-4 sm:py-24 gap-12">
              <Paper
                variant="outlined"
                color="neutral"
                className="flex flex-col items-center justify-start rounded-3xl shadow-lg px-2 gap-8 bg-gradient-radial from-white to-purple-50 w-11/12 py-0 lg:w-3/4"
              >
                <Header />
                <main className="flex flex-col items-center justify-start gap-8 w-full h-full sm:px-16">{children}</main>
                <BottomNavigation />
              </Paper>
            </div>
          </Provider>
        </body>
      </ThemeProvider>
    </html>
  );
}
