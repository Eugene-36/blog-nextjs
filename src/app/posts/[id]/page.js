import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import toggleBookmark from '../../bookmarks/action';

export default async function PostView({ params }) {
  const { id } = await params;
  const session = await auth();
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
  if (!post) return notFound();
  let isSaved = false;
  if (session?.user?.email) {
    const me = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (me) {
      const bm = await prisma.bookmark.findUnique({
        where: { userId_postId: { userId: me.id, postId: post.id } },
      });
      isSaved = Boolean(bm);
    }
  }

  return (
    <main className='container'>
      <div className='card p-2' style={{ width: '18rem' }}>
        <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
        <p className='text-muted mb-4'>
          by {post.author?.email ?? 'unknown'} ·{' '}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        {session?.user && (
          <form
            action={toggleBookmark.bind(null, post.id)}
            method='post'
            className='mb-3'
          >
            <button
              className={`btn btn-${
                isSaved ? 'secondary' : 'outline-secondary'
              } btn-sm`}
              type='submit'
            >
              {isSaved ? 'Unsave' : 'Save'}
            </button>
          </form>
        )}

        <article style={{ whiteSpace: 'pre-wrap' }}>{post.content}</article>
        {console.log('post?.imageUrl', post?.imageUrl)}
        <div className='text-center'>
          {post.imageUrl ? (
            <Image
              src={`${post?.imageUrl}`}
              width={250}
              height={250}
              style={{ objectFit: 'contain' }}
              alt={post.title}
            />
          ) : (
            <div className='text-muted'>No image</div>
          )}
        </div>
      </div>
    </main>
  );
}
