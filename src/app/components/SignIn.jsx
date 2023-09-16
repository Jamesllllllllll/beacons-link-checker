'use client'
import { signIn } from 'next-auth/react';
import Button from '@mui/material/Button';

export default function SignIn() {
  return (
    <>
      <Button
        component="a"
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault();
          signIn('google');
        }}
      >
        Sign in
      </Button>
    </>
  );
}
