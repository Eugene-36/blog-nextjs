'use server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from '@/utils/cloudinaryUtils';

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

  let imageUrl = null;
  let imagePublicId = null;
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //======== Cloudinary delete =============
    if (post.imagePublicId) {
      await deleteFromCloudinary(post.imagePublicId);
    }
    const uploaded = await uploadToCloudinary(buffer, { folder: 'blog-posts' });
    imageUrl = uploaded.secure_url;
    imagePublicId = uploaded.public_id;
  }
  const prismaObjectUpdate = {
    where: {
      id,
    },
    data: {
      title,
      content,
      ...(imageUrl ? { imageUrl, imagePublicId } : {}),
    },
  };
  // Working part
  await prisma.post.update(prismaObjectUpdate);
  redirect(`/posts/${id}?toast=post_updated`);
}
