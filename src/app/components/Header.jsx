import Link from 'next/link';
import { authOptions } from './../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import SignIn from './SignIn';
import SignOut from './SignOut';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import { usePathname } from 'next/navigation';

export default async function Header() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  const avatar = session?.user?.image;
  const name = session?.user?.name;
  return (
    <AppBar position="static" color="transparent" className="py-2" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'end' }}>
        {!session && <SignIn />}
        {session && <SignOut name={name} avatar={avatar} />}
      </Toolbar>
    </AppBar>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    },
  };
}
