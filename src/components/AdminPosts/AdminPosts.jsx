'use client';
import { createSwapy } from 'swapy';
import { useState, useEffect, useRef } from 'react';

export function AdminPosts({ posts, deletePost }) {
  const [postsForUI, setPostsForUI] = useState([]);
  const swapy = useRef(null);
  const container = useRef(null);

  // console.log('posts in AdminPosts', posts);
  useEffect(() => {
    // If container element is loaded
    let savedOrder = JSON.parse(
      localStorage.getItem('adminPostsOrder') || '[]'
    );

    if (savedOrder.length === 0) {
      localStorage.setItem(
        'adminPostsOrder',
        JSON.stringify(posts.map((p) => p.id))
      );
    }
    let currentOrder = JSON.parse(localStorage.getItem('adminPostsOrder'));
    console.log('currentOrder@@@@@@@@@', currentOrder);
    if (currentOrder.length > 0) {
      setPostsForUI(() => {
        return currentOrder
          .map((id) => posts.find((post) => post.id === id))
          .filter((post) => post !== undefined);
      });
    }

    if (container.current) {
      swapy.current = createSwapy(container.current);

      swapy.current.onSwapEnd((event) => {
        localStorage.setItem(
          'adminPostsOrder',
          JSON.stringify(event.slotItemMap.asArray.map((item) => item.item))
        );
      });
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy();
    };
  }, [posts]);
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
