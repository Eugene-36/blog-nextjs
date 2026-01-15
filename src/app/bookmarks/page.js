import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function BookmarkPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: user.id },
    include: { post: { select: { id: true, title: true, createdAt: true } } },
    orderBy: { id: 'desc' },
  });

  return (
    <main className='container' style={{ maxWidth: 720, margin: '40px auto' }}>
      <h1 className='mb-3'>Saved Posts</h1>
      {!bookmarks.length && <p>No saved posts yet</p>}
      <ul className='list-group'>
        {bookmarks.map((el) => (
          <li
            key={el.id}
            className='list-group-item d-flex justify-content-between align-items-center shadow'
          >
            <Link href={`/posts/${el.post.id}`}>{el.post.title}</Link>
            <small className='text-muted'>
              {new Date(el.post.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
}
