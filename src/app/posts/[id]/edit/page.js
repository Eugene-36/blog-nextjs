import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import EditPostForm from '@components/Edit/EditPostForm';

export default async function EditView({ params }) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user) redirect('/login');

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== me.id) redirect('/login');

  return (
    <main className='container'>
      <EditPostForm id={id} post={post} />
    </main>
  );
}
