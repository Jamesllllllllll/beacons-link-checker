'use client';
import { signOut } from 'next-auth/react';
import Button from '@mui/material/Button';

export default function SignOut({ name, avatar }) {
  return (
    <>
      <div className="flex flex-row items-end gap-4 ">
        <span
          style={{ backgroundImage: `url('${avatar}')` }}
          className="rounded-full h-11 w-11 bg-cover bg-no-repeat inline-block"
        />
        <span className="flex flex-col justify-center text-sm">
          Signed in as
          <strong>{name}</strong>
        </span>
        <Button
          variant="outlined"
          component="a"
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </Button>
      </div>
    </>
  );
}
