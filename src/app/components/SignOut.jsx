'use client';
import { signOut } from 'next-auth/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SignOut({ name, avatar }) {
  const showIcons = useMediaQuery('(max-width:625px');

  return (
    <>
      {showIcons ? (
        <Button
          component="a"
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          <LogoutRoundedIcon />
        </Button>
      ) : (
        <Stack
          direction="row"
          className="items-end gap-4 px-3 py-2 items-center bg-white rounded "
        >
          <span
            style={{ backgroundImage: `url('${avatar}')` }}
            className="rounded-full h-11 w-11 bg-cover bg-no-repeat inline-block shadow-inner"
          />

          <Button
            component="a"
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="hover:outline hover:outline-1 outline-violet-200"
          >
            Sign out
          </Button>
        </Stack>
      )}
    </>
  );
}
