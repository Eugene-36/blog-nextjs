import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import deletePost from './action';
import { getCurrentUser } from '@/utils/roleChecker';
import { pagination } from '@/utils/pagination';
import Pagination from '@/components/Pagination/Pagination.jsx';

export default async function AdminPage({ searchParams }) {
  // PAGINATION START
  const { q, page } = await searchParams;
  const searchedWord = (q || '').trim();
  let currentPage = parseInt(page) || 1;
  const paginationLimit = 5;
  const handleEdgeCasesForPagination = () => redirect('/admin/posts');
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
  const { offset, totalPages } = pagination(
    currentPage,
    paginationLimit,
    totalPosts
  );
  if (currentPage > totalPages) handleEdgeCasesForPagination();
  const postsRetrievedForPagination = await prisma.post.findMany({
    take: paginationLimit,
    skip: offset,
    where,
    orderBy: { createdAt: 'desc' },
  });
  // PAGINATION END

  // AUTH CHECKING
  const session = await auth();
  const me = await getCurrentUser();
  if (me.role !== 'ADMIN') redirect('/login');
  if (!session?.user) redirect('/login');

  return (
    <main className='container'>
      <h1>All posts</h1>
      <ul className='list-group'>
        {postsRetrievedForPagination.map(({ id, title }) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchedWord={searchedWord}
        basePath='/admin/posts'
      />
    </main>
  );
}
