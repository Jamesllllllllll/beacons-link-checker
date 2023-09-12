'use client';

import { SessionProvider } from 'next-auth/react';

export function Provider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
