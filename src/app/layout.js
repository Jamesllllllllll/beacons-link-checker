import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import { Provider } from './components/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Check Your Beacons Links',
  description: 'Check for broken links on your Beacons profile page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
