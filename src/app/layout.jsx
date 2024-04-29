import './globals.css';
import { Inter } from 'next/font/google';
import Paper from '@mui/material/Paper';
import Header from './components/Header';
import { ContextProvider } from './context/AppContext';
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
          <body
            className={`${inter.className} flex flex-col justify-center min-h-screen m-0`}
          >
            <ContextProvider>
              <Provider>
                <div className="flex justify-center">
                  <div
                    className="flex flex-col items-stretch justify-start sm:rounded-2xl shadow-lg sm:p-2 gap-8 bg-gradient-radial from-white to-purple-50 w-[800] w-[800px] min-h-screen sm:min-h-min sm:m-4"
                  >
                    <Header />
                    <main className="flex flex-col items-center justify-start gap-8 pb-16 sm:px-16 min-h-[500px]">
                      {children}
                    </main>
                  </div>
                </div>
              </Provider>
            </ContextProvider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
