import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function getCurrentUser() {
  const session = await auth();
  const me = await prisma.user?.findUnique({
    where: { email: session.user.email },
  });
  if (!me) throw new Error('User not found');
  console.log('me', me);
  return me;
}
