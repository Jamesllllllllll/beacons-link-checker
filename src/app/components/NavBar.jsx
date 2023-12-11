'use client';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import RampRightIcon from '@mui/icons-material/RampRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { usePathname } from 'next/navigation';

const NAVLINKS = [
  { path: '/', name: 'Home', icon: <HomeRoundedIcon /> },
  { path: '/impressum', name: 'Impressum', icon: <InfoRoundedIcon /> },
  { path: '/privacy', name: 'Privacy', icon: <PolicyRoundedIcon /> },
  { path: '/roadmap', name: 'Roadmap', icon: <RampRightIcon /> },
];

export default function NavBar() {
  const pathname = usePathname();
  const showIcons = useMediaQuery('(max-width:625px');
  return (
    <Box>
      <List component="nav" className="flex flex-row">
        {NAVLINKS.map((page) => {
          const isActive = pathname === page.path;
          return (
            <ListItem key={page.name} className="px-1">
              <Link
                href={page.path}
                className="no-underline hover:no-underline"
              >
                <ListItemButton
                  className={`rounded hover:outline hover:outline-1 outline-violet-200 hover:bg-purple-200 hover:drop-shadow ${
                    isActive &&
                    'bg-purple-200 drop-shadow outline-transparent hover:outline-transparent'
                  }`}
                >
                  {showIcons ? page.icon : page.name}
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
