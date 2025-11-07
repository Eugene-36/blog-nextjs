import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostView({ params }) {
  const { id } = await params;
  console.log('PostView params:', id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
  if (!post) return notFound();

  return (
    <main className='container'>
      <div className='card p-2' style={{ width: '18rem' }}>
        <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
        <div className='card-body'>
          {/* <h5 class='card-title'>Card title</h5> */}
          {post.content ? (
            <p className='card-text'>{post.content}</p>
          ) : (
            <p className='card-text'>No content available.</p>
          )}
          <Link href='/posts' className='text-blue-500 hover:underline'>
            &larr; Back to Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
