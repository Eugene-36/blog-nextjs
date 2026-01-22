'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
export function Gnews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('api/gnews')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setError(data.message);
        setArticles(data.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error('Error fetching Gnews articles:', err.message);
      });
  }, []);
  if (loading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='card mb-3 placeholder-glow'>
            <div className='placeholder card-img-top' style={{ height: 80 }} />
            <div className='card-body p-2'>
              <span className='placeholder col-10 mb-2'></span>
              <span className='placeholder col-4'></span>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {articles?.length > 0 &&
        articles.map(({ image, title, url, id }) => (
          <div key={id} className='card' style={{ marginBottom: '1rem' }}>
            <Image
              width={120}
              height={80}
              className='card-img-top'
              src={
                image.startsWith('http')
                  ? image.replace('http://', 'https://')
                  : '/image-not-found.png'
              }
              alt='Card image cap'
              style={{ width: 'auto', height: 'auto' }}
              placeholder='empty'
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
