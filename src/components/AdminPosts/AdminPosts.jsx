'use client';
export function AdminPosts({ posts, deletePost }) {
  return (
    <div>
      <ul className='list-group'>
        {posts.map(({ id, title }) => (
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
    </div>
  );
}
