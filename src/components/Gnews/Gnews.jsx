'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
export function Gnews() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('api/auth/gnews')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setError(data.message);

        setArticles(data.data.articles);
      })
      .catch((err) =>
        console.error('Error fetching Gnews articles:', err.message)
      );
  }, []);
  return (
    <>
      {articles?.length > 0 &&
        articles.map(({ image, title, url, id }) => (
          <div key={id} className='card' style={{ marginBottom: '1rem' }}>
            {/* <img
              className='card-img-top'
              src={image ? image : '/image-not-found.png'}
              alt='Card image cap'
            /> */}
            <Image
              width={120}
              height={80}
              className='card-img-top'
              src={image ? image : '/image-not-found.png'}
              alt='Card image cap'
            />

            <div className='card-body p-1'>
              <h5 className='card-title fs-6'>{title}</h5>
              <a
                href={url}
                className='btn btn-primary'
                target='_blank'
                rel='noopener noreferrer'
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      {error && <p>{error}</p>}
    </>
  );
}
