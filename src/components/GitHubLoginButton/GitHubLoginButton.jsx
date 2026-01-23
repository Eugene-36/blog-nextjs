'use client';

import { signIn } from 'next-auth/react';

export default function GitHubLoginButton() {
  const handleGitHubSignIn = async () => {
    await signIn('github', {
      callbackUrl: '/?toast=login_successful',
    });
  };

  return (
    <button className='btn btn-danger w-100 mb-3' onClick={handleGitHubSignIn}>
      <i className='bi bi-github me-2'></i> Sign in with GitHub
    </button>
  );
}
