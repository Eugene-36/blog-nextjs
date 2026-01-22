'use client';

import { signIn } from 'next-auth/react';


export default function GoogleLoginButton() {
  const handleGoogleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/?toast=login_successful',
    });
  };

  return (
    <button
      className='btn btn-danger w-100 mb-3'
      onClick={handleGoogleSignIn}
    >
      <i className='bi bi-google me-2'></i> Sign in with Google
    </button>
  );
}