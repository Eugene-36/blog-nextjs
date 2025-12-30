'use client';

import React from 'react';
import Link from 'next/link';
const NavItems = ({ session, logoutAction }) => {
  return (
    <>
      <div className='container pt-3 pb-3'>
        <nav className='d-flex align-items-center'>
          <Link href='/'>Home</Link>
          {session?.user?.role === 'ADMIN' && (
            <>
              <Link className='ms-3' href='/admin/users'>
                Table Users
              </Link>
              <Link className='ms-3' href='/admin/posts'>
                Admin posts
              </Link>
            </>
          )}
          {session?.user ? (
            <>
              <Link href='/bookmarks' className='ms-3'>
                Bookmarks
              </Link>
              <Link href='/dashboard' className='ms-3'>
                Dashboard
              </Link>
              <span className='ms-3 me-3 ms-auto'>
                Hello, {session.user.email}
              </span>
              <form action={logoutAction}>
                <button className='btn btn-danger ' type='submit'>
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link className='ms-3' href='/login'>
                Login
              </Link>
              <Link className='ms-3' href='/register'>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavItems;
