'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/roleChecker';
export default async function updateUserRole(formData) {
  const session = await auth();
  const currentUserRole = await getCurrentUser();
  if (!session?.user) throw new Error('Unauthorized');
  if (currentUserRole.role !== 'ADMIN') throw new Error('Forbidden');
  const userId = String(formData.get('id') || '');
  if (!userId) throw new Error('User ID is required');
  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!me) throw new Error('User not found');
  const target = await prisma.user.findUnique({
    where: { id: userId },
  });
  await prisma.user.update({
    where: { id: userId },
    data: {
      role: target.role === 'USER' ? 'ADMIN' : 'USER',
      permissionsVersion: me.permissionsVersion + 1,
    },
  });
  redirect('/admin/users?toast=role_updated');
}
