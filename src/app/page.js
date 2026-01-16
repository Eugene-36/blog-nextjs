import prisma from '@/lib/prisma';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
import styles from './page.module.css';
import { redirect } from 'next/navigation';
import { pagination } from '@/utils/pagination';
import Pagination from '@/components/Pagination/Pagination.jsx';
import { Gnews } from '@/components/Gnews/Gnews';
import { QuoteOfTheDay } from '@/components/QuoteOfTheDay/QuoteOfTheDay';

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
  // Offset calculation how many posts to skip
  const { totalPages, offset } = pagination(
    currentPage,
    paginationLimit,
    totalPosts
  );

  if (totalPages === 0) {
    return (
      <main className='container'>
        <h2 style={{ textAlign: 'center' }}>There are no posts yet.</h2>
      </main>
    );
  }

  if (currentPage > totalPages) handleEdgeCasesForPagination();

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
      <div className='row'>
        <div
          className={`${styles.customMask} col-2 overflow-auto`}
          style={{ maxHeight: '90vh' }}
        >
          <Gnews />
        </div>
        <div className='col'>
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
            <div className='mb-3 d-flex shadow'>
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
            <ul className='list-group shadow'>
              {handleUIrender(postsRetrievedForPagination)}
            </ul>
          )}
          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchedWord={searchedWord}
            basePath='/'
          />
          <QuoteOfTheDay />
        </div>
      </div>
    </main>
  );
}
