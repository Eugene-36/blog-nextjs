import prisma from '@/lib/prisma';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
import styles from './page.module.css';

export default async function Home({ searchParams }) {
  const { q } = await searchParams;
  const searchedWord = (q || '').trim();

  const where = searchedWord
    ? {
        title: {
          contains: searchedWord,
        },
      }
    : {};
  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true },
  });

  const handleUIrender = (dataObject) => {
    return dataObject.map(({ id, title, createdAt }) => (
      <li
        key={id}
        className='list-group-item d-flex justify-content-between align-items-center'
      >
        <Link href={`/posts/${id}`} className={styles.postLink}>
          {title}
        </Link>
        <span className='badge bg-secondary rounded-pill'>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </li>
    ));
  };
  return (
    <main className='container'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1 className='mb-0'>Posts </h1>
        <Link href='/posts/new' className='btn btn-primary'>
          New Post
        </Link>
      </div>
      {searchedWord && (
        <Link href='/' className='btn btn-link btn-sm ms-2'>
          Clear
        </Link>
      )}

      <form action='/' method='get'>
        <div className='mb-3 d-flex'>
          <input
            name='q'
            type='text'
            className='form-control me-2'
            defaultValue={searchedWord}
            placeholder='Search posts...'
          />
          <button className='btn btn-primary' type='submit'>
            Search
          </button>
        </div>
      </form>
      {!searchedWord && <p className='mb-3'>All Posts</p>}
      {searchedWord && (
        <p className='mb-3'>
          Search results for <strong>{searchedWord}</strong> ({posts.length}{' '}
          found)
        </p>
      )}
      {!posts.length && <p>No posts found.</p>}
      {!!posts.length && (
        <ul className='list-group'>{handleUIrender(posts)}</ul>
      )}
    </main>
  );
}
