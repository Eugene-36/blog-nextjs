import deletePost from './action';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    // include: { id: true },
  });
  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className='container'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>My Posts</h1>
        <Link className='btn btn-primary' href='/posts/new'>
          New Post
        </Link>
      </div>

      {!posts.length && <p>You have no posts yet.</p>}

      <ul className='list-group'>
        {posts.map((p) => (
          <li
            key={p.id}
            className='list-group-item d-flex justify-content-between align-items-center gap-2'
          >
            <div className='me-auto'>
              <strong>
                <Link href={`/posts/${p.id}`}>{p.title}</Link>
              </strong>
              <div className='small text-muted'>
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </div>

            {/* позже добавим edit */}
            <form action={deletePost} method='post'>
              <input type='hidden' name='id' value={p.id} />
              <button className='btn btn-outline-danger btn-sm' type='submit'>
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
