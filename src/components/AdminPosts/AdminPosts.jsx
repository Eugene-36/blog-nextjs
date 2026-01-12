'use client';
import { createSwapy } from 'swapy';
import { useState, useEffect, useRef } from 'react';

export function AdminPosts({ posts, deletePost, currentPage }) {
  const [postsForUI, setPostsForUI] = useState([]);
  const swapy = useRef(null);
  const container = useRef(null);

  // console.log('posts in AdminPosts', posts);
  useEffect(() => {
    console.log('posts changed useEffect triggered', posts);
    // If container element is loaded
    if (!posts || posts.length === 0) return;
    let savedOrder = JSON.parse(localStorage.getItem(currentPage) || '[]');

    if (savedOrder.length === 0) {
      localStorage.setItem(currentPage, JSON.stringify(posts.map((p) => p.id)));
    }
    let currentOrder = JSON.parse(localStorage.getItem(currentPage) || '[]');

    if (currentOrder.length > 0) {
      setPostsForUI(() => {
        return currentOrder
          .map((id) => posts.find((post) => post.id === id))
          .filter((post) => post !== undefined);
      });
    }

    if (container.current) {
      swapy.current = createSwapy(container.current);
      console.log('Swapy instance created:', container.current, swapy.current);

      swapy.current.onSwapEnd((event) => {
        localStorage.setItem(
          currentPage,
          JSON.stringify(event.slotItemMap.asArray.map((item) => item.item))
        );
        setPostsForUI(
          localStorage.getItem(currentPage)
            ? JSON.parse(localStorage.getItem(currentPage)).map((id) =>
                posts.find((post) => post.id === id)
              )
            : posts
        );
      });
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy();
    };
  }, [currentPage, posts]);
  return (
    <div className='container'>
      <ul className='list-group' ref={container}>
        {postsForUI.map(({ id, title }) => (
          <div data-swapy-slot={id} key={id}>
            <li
              key={id}
              className='list-group-item d-flex justify-content-between align-items-center'
              data-swapy-item={id}
              onClick={() => 'click'}
            >
              <strong>{title}</strong>
              <form action={deletePost}>
                <input type='hidden' name='id' value={id} />
                <button className='btn btn-danger'>Delete</button>
              </form>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
