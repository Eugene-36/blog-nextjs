'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

export default async function deletePost(formData) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  const postId = String(formData.get('id') || '');
  if (!postId) throw new Error('Post ID is required');
  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!me) throw new Error('User not found');
  const target = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!target || target.authorId !== me.id) throw new Error('Forbidden');

  if (target.imageUrl) {
    try {
      const oldPath = path.join(process.cwd(), 'public', target.imageUrl);
      await fs.unlink(oldPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('Error: File or directory not found (ENOENT)');
      }
    }
  }
  await prisma.post.delete({
    where: { id: postId },
  });
  redirect('/dashboard');
}
