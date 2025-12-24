'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function deletePost(formData) {
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');
  const postId = formData.get('id') || '';
  if (!postId) throw new Error('Post ID is required');
  // const me = await prisma.user.findUnique({
  //   where: { email: session.user.email },
  // });
  // if (!me) throw new Error('User not found');
  const target = await prisma.post.findUnique({
    where: { id: postId },
  });
  console.log('postId', postId);
  console.log('target', target);
  // if (!target) throw new Error('Post not found');
  await prisma.post?.delete({
    where: { id: postId },
  });
  redirect('/admin/posts');
}
