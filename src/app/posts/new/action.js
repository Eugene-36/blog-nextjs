'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error('User not found');
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  if (!title) throw new Error('Title is required');

  const post = await prisma.post.create({
    data: { title, content, authorId: user.id, published: true },
  });
  redirect(`/posts/${post.id}`);
}
