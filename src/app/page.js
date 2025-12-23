import prisma from '@/lib/prisma';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
import styles from './page.module.css';
import { redirect } from 'next/navigation';

export default async function Home({ searchParams }) {
  const { q, page } = await searchParams;
  const searchedWord = (q || '').trim();
  let currentPage = parseInt(page) || 1;
  const paginationLimit = 5;
  //
  const handleEdgeCasesForPagination = () => redirect('/');
  // Ensure currentPage is at least 1 and not NaN and not grater than totalPages
  if (currentPage < 1) handleEdgeCasesForPagination();
  const where = searchedWord
    ? {
        title: {
          contains: searchedWord,
        },
      }
    : {};
  const totalPosts = await prisma.post.count({ where });
  const totalPages = Math.ceil(totalPosts / paginationLimit);

  if (totalPages === 0) {
    return (
      <main className='container'>
        <h2 style={{ textAlign: 'center' }}>There are no posts yet.</h2>
      </main>
    );
  }

  if (currentPage > totalPages) handleEdgeCasesForPagination();

  // Offset calculation how many posts to skip
  const offset = (currentPage - 1) * paginationLimit;

  const postsRetrievedForPagination = await prisma.post.findMany({
    take: paginationLimit,
    skip: offset,
    where,
    orderBy: { createdAt: 'desc' },
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
          Search results for <strong>{searchedWord}</strong> ({totalPosts}{' '}
          found)
        </p>
      )}
      {!totalPosts && <p>No posts found.</p>}
      {!!postsRetrievedForPagination.length && (
        <ul className='list-group'>
          {handleUIrender(postsRetrievedForPagination)}
        </ul>
      )}
      {/* PAGINATION */}
      <span className='mt-3 d-block'>
        Page {currentPage} of {totalPages}
      </span>
      <nav aria-label='Page navigation posts' className='mt-3'>
        <ul className='pagination'>
          <li className='page-item'>
            {currentPage > 1 && (
              <Link
                className='page-link'
                href={`/?page=${currentPage - 1}${
                  searchedWord ? `&q=${searchedWord}` : ''
                }`}
                aria-label='Previous'
              >
                <span aria-hidden='true'>&laquo;</span>
              </Link>
            )}
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              {currentPage}
            </a>
          </li>
          <li className='page-item'>
            <span className='page-link disabled'>
              {currentPage} / {totalPages}
            </span>
          </li>
          <li className='page-item'>
            {currentPage < totalPages && (
              <Link
                className='page-link'
                href={`/?page=${currentPage + 1}${
                  searchedWord ? `&q=${searchedWord}` : ''
                }`}
                aria-label='Next'
              >
                <span aria-hidden='true'>&raquo;</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </main>
  );
}
