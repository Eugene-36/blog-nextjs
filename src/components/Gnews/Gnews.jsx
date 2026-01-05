'use client';
import { useEffect, useState } from 'react';
export function Gnews() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch('api/auth/gnews')
      .then((res) => res.json())
      .then((data) => setArticles(data.data.articles));
  }, []);
  console.log('articles', articles);

  return (
    <>
      {articles.length > 0 &&
        articles.map(({ image, title, url, id }) => (
          <div key={id} className='card' style={{ marginBottom: '1rem' }}>
            <img
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
    </>
  );
}
