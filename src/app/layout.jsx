import './globals.css';
import { Inter } from 'next/font/google';
import Paper from '@mui/material/Paper';
import Header from './components/Header';
import { Provider } from './components/provider';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { purpleTheme } from './components/purpleTheme';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Check Your Beacons Links',
  description: 'Check for broken links on your Beacons profile page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={purpleTheme}>
          <body className={inter.className}>
            <Provider>
              {/* <Header /> */}
              <div className="flex min-h-screen justify-center py-4 sm:py-24 gap-12">
                <Paper
                  variant="outlined"
                  color="neutral"
                  className="flex flex-col items-center justify-start rounded-2xl shadow-lg p-2 gap-8 bg-gradient-radial from-white to-purple-50 w-11/12 lg:w-3/4"
                >
                  <Header />
                  <main className="flex flex-col items-center justify-start gap-8 w-full h-full sm:px-16">
                    {children}
                  </main>
                </Paper>
              </div>
            </Provider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
