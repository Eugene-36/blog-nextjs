'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 } from 'uuid';

export default async function updatePost(id, formData) {
  const session = await auth();
  const idImage = v4();
  if (!session?.user) throw new Error('Unauthorized');

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== me.id) throw new Error('Forbidden');

  const title = formData.get('title') || '';
  const content = formData.get('content') || '';
  const file = formData.get('image') || '';

  let imageUrl = null;
  let baseName = '';

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // 2. Convert your buffer into a Uint8Array
    const contentImage = new Uint8Array(buffer);
    //if file exist create new path
    baseName = `${idImage}${path.extname(file.name)}`;

    const newPath = path.join(process.cwd(), 'public', 'uploads', baseName);
    // Delete img from old path
    if (baseName && post.imageUrl) {
      const oldPath = path.join(process.cwd(), 'public', post.imageUrl);
      await fs.unlink(oldPath);
    }
    //If post does not have previously loaded img in DB
    //and you want add new one
    if (baseName && !post.imageUrl) {
      const createNewImgForPost = path.join(
        process.cwd(),
        'public',
        'uploads',
        baseName
      );
      await fs.writeFile(createNewImgForPost, contentImage);
      imageUrl = `/uploads/${baseName}`;
    }
    //When you have new img loaded and entry in DB we update
    //file in folder and in DB
    if (baseName && post.imageUrl) {
      await fs.writeFile(newPath, contentImage);
      imageUrl = `/uploads/${baseName}`;
    }
  }
  const isImageURLexist = imageUrl ? imageUrl : post.imageUrl;
  const prismaObjectUpdate = {
    where: {
      id,
    },
    data: {
      title,
      content,
      imageUrl: isImageURLexist,
    },
  };
  // Working part
  await prisma.post.update(prismaObjectUpdate);
  redirect(`/posts/${id}`);
}
