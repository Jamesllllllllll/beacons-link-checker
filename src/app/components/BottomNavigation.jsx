'use client';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();
  return (
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
  );
}
