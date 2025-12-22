'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import cloudinary from '@/lib/cloudinary';

function uploadToCloudinary(buffer, { folder }) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}
export async function createPost(formData) {
  const session = await auth();
  const idImage = v4();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error('User not found');
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const file = formData.get('image') || null;

  let imageUrl = null;
  let imagePublicId = null;
  let baseName = '';

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploaded = await uploadToCloudinary(buffer, { folder: 'blog-posts' });
    imageUrl = uploaded.secure_url;
    imagePublicId = uploaded.public_id;
    // 2. Convert your buffer into a Uint8Array
    // const contentImage = new Uint8Array(buffer);
    // //if file exist create new path
    // baseName = `${idImage}${path.extname(file.name)}`;
    // const newPath = path.join(process.cwd(), 'public', 'uploads', baseName);
    // await fs.writeFile(newPath, contentImage);
    // if (baseName) {
    //   imageUrl = `/uploads/${baseName}`;
    // }
  }

  if (!title) throw new Error('Title is required');

  const post = await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,
      imagePublicId,
      authorId: user.id,
      published: true,
    },
  });
  redirect(`/posts/${post.id}`);
}
