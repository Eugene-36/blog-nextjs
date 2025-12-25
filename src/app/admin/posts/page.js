import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import deletePost from './action';
import { getCurrentUser } from '@/utils/roleChecker';

export default async function AdminPage() {
  const session = await auth();
  const me = await getCurrentUser();
  if (me.role !== 'ADMIN') redirect('/login');
  if (!session?.user) redirect('/login');

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className='container'>
      <h1>All posts</h1>
      <ul className='list-group'>
        {posts.map(({ id, title }) => (
          <li
            key={id}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            <strong>{title}</strong>
            <form action={deletePost}>
              <input type='hidden' name='id' value={id} />
              <button className='btn btn-danger'>Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
