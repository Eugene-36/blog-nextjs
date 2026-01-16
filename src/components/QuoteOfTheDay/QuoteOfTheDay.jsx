'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
export function QuoteOfTheDay() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('api/auth/ninjas')
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setError(data.message);

        setQuotes(data.data);
        setLoading(false);
      })
      .catch((err) =>
        console.error('Error fetching Ninja quotes:', err.message)
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <>
        {Array.from({ length: 1 }).map((_, i) => (
          <div key={i} className='card mb-3 placeholder-glow w-50 mx-auto'>
            <div
              className='placeholder card-img-top rounded-circle mx-auto'
              style={{ width: 80, height: 80, borderRadius: '50%' }}
            />
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
      <h2 className='text-center mb-2'>Quote of the Day</h2>
      {quotes?.length > 0 &&
        quotes.map(({ quote, author }) => (
          <div
            key={author}
            className='card w-50 mx-auto text-center p-1'
            style={{ marginBottom: '1rem' }}
          >
            <Image
              width={80}
              height={80}
              className='card-img-top rounded-circle mx-auto'
              src={'/n-photo.png'}
              alt='Card image cap'
              style={{ width: '80px', height: '80px' }}
              placeholder='empty'
            />

            <div className='card-body p-1'>
              <h5 className='card-title fs-6'>{quote}</h5>
              <p className='card-text'>{author}</p>
            </div>
          </div>
        ))}
      {error && <p>{error}</p>}
    </>
  );
}
