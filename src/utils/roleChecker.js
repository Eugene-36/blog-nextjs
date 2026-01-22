import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function getCurrentUser() {
  const session = await auth();
  const me = await prisma.user?.findUnique({
    where: { email: session.user.email },
  });
  console.log('Current User:', me);
  if (!me) throw new Error('User not found');
  return me;
}
