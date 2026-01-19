'use client';
import { createSwapy } from 'swapy';
import { useState, useEffect, useRef } from 'react';

export function AdminPosts({ posts, deletePost, currentPage }) {
  const [postsForUI, setPostsForUI] = useState([]);
  const swapy = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    let savedOrder = JSON.parse(localStorage.getItem(currentPage) || '[]');

    if (savedOrder.length === 0) {
      localStorage.setItem(currentPage, JSON.stringify(posts.map((p) => p.id)));
    }
    let currentOrder = JSON.parse(localStorage.getItem(currentPage) || '[]');

    if (currentOrder.length > 0) {
      console.log('Setting postsForUI from localStorage order');
      setPostsForUI(() => {
        return currentOrder
          .map((id) => posts.find((post) => post.id === id))
          .filter((post) => post !== undefined);
      });
    }
  }, [currentPage, posts]);
  useEffect(() => {
    if (container.current) {
      if (postsForUI.length === posts.length) {
        swapy.current = createSwapy(container.current);
        swapy.current.onSwapEnd((event) => {
          let newOrders = event.slotItemMap.asArray.map((item) => item.item);
          let newPostsForUI = newOrders
            .map((id) => posts.find((post) => post.id === id))
            .filter((post) => post !== undefined);
          localStorage.setItem(currentPage, JSON.stringify(newOrders));
        });
      }
    }
    return () => {
      swapy.current?.destroy();
    };
  });
  return (
    <div className='container'>
      <div className='list-group' ref={container}>
        {postsForUI.map(({ id, title }) => (
          <ul data-swapy-slot={id} key={id} className='shadow p-0 rounded'>
            <li
              key={id}
              className='list-group-item d-flex justify-content-between align-items-center'
              data-swapy-item={id}
            >
              <strong>{title}</strong>
              <form action={deletePost}>
                <input type='hidden' name='id' value={id} />
                <button className='btn btn-danger'>Delete</button>
              </form>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
