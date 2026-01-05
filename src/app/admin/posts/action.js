'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/roleChecker';

export default async function deletePost(formData) {
  const session = await auth();
  const me = await getCurrentUser();

  if (!session?.user) throw new Error('Unauthorized');
  if (me.role !== 'ADMIN') throw new Error('Forbidden');
  const postId = formData.get('id') || '';
  if (!postId) throw new Error('Post ID is required');

  await prisma.post?.delete({
    where: { id: postId },
  });
  redirect('/admin/posts?toast=post_deleted');
}
