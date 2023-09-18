'use client';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
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
      <List component="nav" className="flex flex-row">
        {NAVLINKS.map((page) => {
          const isActive = pathname === page.path;
          return (
            <ListItem key={page.name}>
              <Link href={page.path} className="no-underline hover:no-underline">
                <ListItemButton className={`rounded hover:outline hover:outline-1 outline-violet-200 hover:bg-purple-200 hover:drop-shadow ${isActive && 'bg-purple-200 drop-shadow outline-transparent hover:outline-transparent'}`}>{page.name}</ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
