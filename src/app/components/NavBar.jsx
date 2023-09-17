'use client';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { usePathname } from 'next/navigation';

const NAVLINKS = [
  { path: '/', name: 'Home' },
  { path: '/impressum', name: 'Impressum' },
  { path: '/privacy', name: 'Privacy' },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <Box>
      <ul className="flex flex-row">
        {NAVLINKS.map((page) => {
          const isActive = pathname === page.path;
          return (
            <li key={page.name}>
              <Link href={page.path}>
                <Button className={`m-2 hover:outline hover:outline-1 outline-violet-200 ${isActive && 'bg-purple-200 hover:bg-purple-200 drop-shadow outline-transparent'}`}>{page.name}</Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
