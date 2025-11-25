'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export default async function toggleBookmark(postId) {
  const session = await auth();
  if (!session?.user.email) throw new Error('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error('User not found');

  const existing = await prisma.bookmark.findUnique({
    where: { userId_postId: { userId: user.id, postId } },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
  } else {
    await prisma.bookmark.create({ data: { userId: user.id, postId } });
  }
  revalidatePath(`/posts/${postId}`);
}
