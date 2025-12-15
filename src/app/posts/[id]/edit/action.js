'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

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
  const file = formData.get('image') || '';

  // console.log('imageUrl', imageUrl);

  let imageUrl = '';
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // 2. Convert your buffer into a Uint8Array
    const contentImage = new Uint8Array(buffer);

    const newPath = path.join(process.cwd(), 'public', 'uploads', file.name);
    const oldPath = path.join(
      process.cwd(),
      'public',
      'uploads',
      post.imageUrl
    );

    fs.unlink(oldPath, function (err) {
      if (err) throw err;
      console.log('File deleted!');
    });

    fs.writeFile(newPath, contentImage, (err) => {
      if (err) console.error(err);
      console.log('File overwritten successfully!');
    });
    imageUrl = `${file.name}`;
  }

  // Working part
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      imageUrl,
    },
  });

  redirect(`/posts/${id}`);
}
