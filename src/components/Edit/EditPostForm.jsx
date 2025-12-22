'use client';
import { useState } from 'react';
import updatePost from '@/app/posts/[id]/edit/action';

const EditPostForm = ({ id, post }) => {
  const [imgPreview, setImgPreview] = useState(
    post.imageUrl ? post.imageUrl : null
  );

  const handleFilePreview = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <h1>Edit Post Page</h1>
      <form method='post' action={updatePost.bind(null, id)}>
        <div className='mb-3'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            className='form-control'
            required
            defaultValue={post.title}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content'>Content</label>
          <textarea
            type='text'
            name='content'
            className='form-control'
            id='content'
            rows='3'
            defaultValue={post.content}
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
            onChange={(e) => handleFilePreview(e)}
          />
          {imgPreview ? (
            <div className='mt-2'>
              <img
                src={imgPreview}
                alt=''
                className='rounded'
                style={{ width: '200px', objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div className='mt-1'>
              <small className='text-muted'>No preview img loaded yet</small>
            </div>
          )}
        </div>
        <button className='btn btn-primary' type='submit'>
          Save
        </button>
        <a href={`/posts/${post.id}`} className='btn btn-link ms-2'>
          Cancel
        </a>
      </form>
    </div>
  );
};

export default EditPostForm;
