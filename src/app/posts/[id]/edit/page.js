import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import updatePost from './action';

export default async function EditView({ params }) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user) redirect('/login');

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== me.id) redirect('/login');

  return (
    <main className='container'>
      <h1>Edit Post Page</h1>
      <form action={updatePost.bind(null, id)} method='post'>
        <div className='mb-3'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            className='form-control'
            defaultValue={post.title}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content'>Content</label>
          <textarea
            defaultValue={post.content}
            type='text'
            name='content'
            className='form-control'
            id='content'
            rows='3'
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='formFile' className='form-label'>
            File input
          </label>
          <input
            className='form-control'
            type='file'
            id='formFile'
            name='image'
            accept='image/png, image/jpeg, image/jpg'
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Save
        </button>
        <a href={`/posts/${post.id}`} className='btn btn-link ms-2'>
          Cancel
        </a>
      </form>
    </main>
  );
}
