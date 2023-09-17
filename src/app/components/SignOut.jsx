'use client';
import { signOut } from 'next-auth/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function SignOut({ name, avatar }) {
  return (
    <>
      <Stack
        direction="row"
        className="items-end gap-4 p-4 items-center bg-white rounded "
      >
        <span
          style={{ backgroundImage: `url('${avatar}')` }}
          className="rounded-full h-11 w-11 bg-cover bg-no-repeat inline-block"
        />
        <Button
          component="a"
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </Button>
      </Stack>
    </>
  );
}
