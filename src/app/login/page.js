'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/',
    });

    if (result.error) setError('Invalid email or password');
  };

  return (
    <main className='container' style={{ maxWidth: 480, margin: '40px auto' }}>
      <h1 className='mb-4'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            name='email'
            type='email'
            className='form-control'
            required
            autoComplete='email'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            name='password'
            type='password'
            className='form-control'
            required
            autoComplete='current-password'
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Sign in
        </button>
      </form>
      {error && <p className='text-danger mt-2'>{error}</p>}
      <p className='mt-2'>
        No account? <a href='/register'>Register</a>
      </p>
    </main>
  );
}
