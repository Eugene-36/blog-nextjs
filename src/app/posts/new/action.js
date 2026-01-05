'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { uploadToCloudinary } from '@/utils/cloudinaryUtils';

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

  let imageUrl = null;
  let imagePublicId = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploaded = await uploadToCloudinary(buffer, { folder: 'blog-posts' });
    imageUrl = uploaded.secure_url;
    imagePublicId = uploaded.public_id;
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
  redirect(`/posts/${post.id}?toast=post_created`);
}
