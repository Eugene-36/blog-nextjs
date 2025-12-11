import { createPost } from './action';
import Link from 'next/link';

export default function NewPostPage() {
  return (
    <main className='container'>
      <h1 className='mb-4'>New Post</h1>
      <form
        action={createPost}
        className='max-w-xl mx-auto mt-10'
        encType='multipart/form-data'
      >
        <div className='mb-3'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='floatingTextarea2' className='mb-1'>
            Content
          </label>

          <textarea
            className='form-control'
            placeholder='Leave your post content here'
            id='floatingTextarea2'
            style={{ height: '200px' }}
            name='content'
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
        <button type='submit' className='btn btn-primary'>
          Create Post
        </button>
        <Link href='/' className='btn btn-link ms-2'>
          Cancel
        </Link>
      </form>
    </main>
  );
}
