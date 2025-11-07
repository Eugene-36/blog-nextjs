import prisma from '@/lib/prisma';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
import styles from './page.module.css';

export default async function Home() {
  const posts = await prisma.post.findMany({
    // where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true },
  });
  return (
    <main className='container'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>Posts </h1>
        <Link href='/posts/new' className='btn btn-primary'>
          New Post
        </Link>
      </div>
      {!posts.length && <p>No posts found.</p>}
      <ul className='list-group'>
        {posts.map(({ id, title, createdAt }) => (
          <li
            key={id}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            <Link href={`/posts/${id}`} className={styles.postLink}>
              {title}
            </Link>
            <span className='badge bg-secondary'>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
