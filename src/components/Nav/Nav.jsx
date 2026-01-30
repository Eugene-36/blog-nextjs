'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const NavItems = ({ session, logoutAction }) => {
  const pathname = usePathname();
  const isActiveLink = (href) =>
    pathname === href ? 'active text-decoration-underline' : '';
  return (
    <>
      <div className='container pt-3 pb-3 d-flex justify-content-between'>
        {/* NEW NAV SIDEBAR */}
        <nav className='navbar navbar-expand-lg bg-body-tertiary p-0 w-100 custom-nav'>
          <Link className='navbar-brand' href='/'>
            {/* Offcanvas navbar */}
            <Image
              src='/blog_icon_70_1.png'
              alt='Logo'
              width={50}
              height={50}
              objectFit='cover'
            />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#navbarOffcanvasLg'
            aria-controls='navbarOffcanvasLg'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='navbarOffcanvasLg'
            aria-labelledby='navbarOffcanvasLgLabel'
          >
            <div className='offcanvas-header'>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <ul className='ps-3 ps-lg-0 navbar-nav flex-grow-1 align-items-center'>
              <li className='nav-item'>
                <Link
                  href='/'
                  className={`nav-link ${isActiveLink('/')}`}
                  aria-current='page'
                >
                  Home
                </Link>
              </li>

              {session?.user?.role === 'ADMIN' && (
                <>
                  <li className='nav-item'>
                    <Link
                      className={`nav-link ms-lg-3 ${isActiveLink('/admin/users')}`}
                      href='/admin/users'
                    >
                      Table Users
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className={`nav-link ms-lg-3 ${isActiveLink('/admin/posts')}`}
                      href='/admin/posts'
                    >
                      Admin posts
                    </Link>
                  </li>
                </>
              )}
              {session?.user ? (
                <>
                  <li className='nav-item ms-lg-3'>
                    <Link
                      href='/bookmarks'
                      className={`nav-link ${isActiveLink('/bookmarks')}`}
                    >
                      Bookmarks
                    </Link>
                  </li>
                  <li className='nav-item ms-lg-3'>
                    <Link
                      href='/dashboard'
                      className={`nav-link ${isActiveLink('/dashboard')}`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <div className='d-flex align-items-center ms-lg-auto'>
                    <div>
                      <span className='me-2'>Hello, {session.user.email}</span>
                      {session.user.image && (
                        <Image
                          width={50}
                          height={50}
                          className='rounded'
                          src={session.user.image}
                          alt='User icon'
                        />
                      )}
                    </div>
                    <form action={logoutAction} className='ms-2'>
                      <button className='btn btn-danger' type='submit'>
                        Logout
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link
                      className={`nav-link ms-3 ${isActiveLink('/login')}`}
                      href='/login'
                    >
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={`nav-link ms-3 ${isActiveLink('/register')}`}
                      href='/register'
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavItems;
