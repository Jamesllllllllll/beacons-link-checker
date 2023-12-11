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
            className={`${inter.className} flex flex-col justify-stretch min-h-[95%]`}
          >
            <ContextProvider>
              <Provider>
                <div className="flex justify-center py-4 sm:py-24">
                  <Paper
                    variant="outlined"
                    color="neutral"
                    className="flex flex-col items-stretch justify-start rounded-2xl shadow-lg p-2 gap-8 bg-gradient-radial from-white to-purple-50 w-[800] w-[800px] min-h-[90vh] sm:min-h-[75vh]"
                  >
                    <Header />
                    <main className="flex flex-col items-center justify-start gap-8 pb-16 sm:px-16 min-h-[500px]">
                      {children}
                    </main>
                  </Paper>
                </div>
              </Provider>
            </ContextProvider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
