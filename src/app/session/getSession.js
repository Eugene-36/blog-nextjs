'use server';
import { auth } from '@/auth';

export const getSession = async () => {
  const session = await auth();
  console.log('Session:', session);
  return session;
};
