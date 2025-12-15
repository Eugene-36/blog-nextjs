'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

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
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // 2. Convert your buffer into a Uint8Array
    const contentImage = new Uint8Array(buffer);

    const newPath = path.join(process.cwd(), 'public', 'uploads', file.name);
    fs.writeFile(newPath, contentImage, (err) => {
      if (err) console.error(err);
    });
    imageUrl = `${file.name}`;
  }

  if (!title) throw new Error('Title is required');

  const post = await prisma.post.create({
    data: { title, content, imageUrl, authorId: user.id, published: true },
  });
  redirect(`/posts/${post.id}`);
}
