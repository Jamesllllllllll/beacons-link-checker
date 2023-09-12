'use client';
import { signOut } from 'next-auth/react';
import Button from '@mui/joy/Button';

export default function SignOut({ name, avatar }) {
  return (
    <>
      <div className="flex flex-row items-center gap-4 ">
        <span
          style={{ backgroundImage: `url('${avatar}')` }}
          className="rounded-full h-11 w-11 bg-cover bg-no-repeat inline-block"
        />
        <span className="flex flex-col">
          <small>Signed in as </small>
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
