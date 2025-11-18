'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function updatePost(id, formData) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== me.id) throw new Error('Forbidden');

  const title = formData.get('title') || '';
  const content = formData.get('content') || '';

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });

  redirect(`/posts/${id}`);
}
