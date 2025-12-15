'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 } from 'uuid';

export async function createPost(formData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error('User not found');
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const file = formData.get('image') || null;

  let imageUrl = '';
  let baseName = '';
  if (baseName) {
    baseName = `${v4(file.name.split('.')[0])}${file.name.split('.')[1]}`;
  }
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // 2. Convert your buffer into a Uint8Array
    const contentImage = new Uint8Array(buffer);

    const newPath = path.join(process.cwd(), 'public', 'uploads', baseName);
    await fs.writeFile(newPath, contentImage, (err) => {
      if (err) console.error(err);
    });
    imageUrl = `/uploads/${baseName}`;
  }

  if (!title) throw new Error('Title is required');

  const post = await prisma.post.create({
    data: { title, content, imageUrl, authorId: user.id, published: true },
  });
  redirect(`/posts/${post.id}`);
}
