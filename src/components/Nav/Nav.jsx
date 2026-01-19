'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const NavItems = ({ session, logoutAction }) => {
  return (
    <>
      <div className='container pt-3 pb-3 d-flex justify-content-between'>
        {/* <nav className='navbar navbar-expand-lg bg-body-tertiary'>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarTogglerDemo01'
              aria-controls='navbarTogglerDemo01'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
              <a className='navbar-brand' href='#'>
                Hidden brand
              </a>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='#'>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Link
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link disabled' aria-disabled='true'>
                    Disabled
                  </a>
                </li>
              </ul>
              <form className='d-flex' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav> */}
        {/* ==================== */}
        {/* <nav className='d-flex align-items-center navbar navbar-expand-lg'>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarTogglerDemo01'
              aria-controls='navbarTogglerDemo01'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
              <Link href='/' className='navbar-brand active'>
                Home
              </Link>
              {session?.user?.role === 'ADMIN' && (
                <>
                  <Link className='ms-3 navbar-brand' href='/admin/users'>
                    Table Users
                  </Link>
                  <Link className='ms-3 navbar-brand' href='/admin/posts'>
                    Admin posts
                  </Link>
                </>
              )}
              {session?.user ? (
                <>
                  <Link href='/bookmarks' className='ms-3 navbar-brand'>
                    Bookmarks
                  </Link>
                  <Link href='/dashboard' className='ms-3 navbar-brand'>
                    Dashboard
                  </Link>
                  <div className='d-flex align-items-center ms-auto'>
                    <span className='ms-3 me-3 ms-auto'>
                      Hello, {session.user.email}
                    </span>
                    <form action={logoutAction}>
                      <button className='btn btn-danger ' type='submit'>
                        Logout
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <Link className='ms-3 navbar-brand' href='/login'>
                    Login
                  </Link>
                  <Link className='ms-3 navbar-brand' href='/register'>
                    Register
                  </Link>
                </>
              )}
            </div>
            <Link className='navbar-brand' href='#'>
              <Image
                src='/docs/5.3/assets/brand/bootstrap-logo.svg'
                alt='Bootstrap'
                width={30}
                height={24}
              />
            </Link>
          </div>
        </nav> */}
        {/* <Image src='/blog_icon_70.png' alt='Logo' width={70} height={70} /> */}
        {/* NEW NAV SIDEBAR */}
        <nav className='navbar navbar-expand-lg bg-body-tertiary p-0 w-100'>
          <a className='navbar-brand' href='#'>
            {/* Offcanvas navbar */}
            <Image
              src='/blog_icon_70.png'
              alt='Logo'
              width={50}
              height={50}
              objectFit='cover'
            />
          </a>
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
            <ul className='ps-3 ps-lg-0 navbar-nav flex-grow-1'>
              {/* {property}{sides}-{breakpoint}-{size} */}
              <li className='nav-item'>
                <Link href='/' className='nav-link active' aria-current='page'>
                  Home
                </Link>
              </li>

              {session?.user?.role === 'ADMIN' && (
                <>
                  <li className='nav-item'>
                    <Link className='ms-lg-3 nav-link' href='/admin/users'>
                      Table Users
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='ms-lg-3 nav-link' href='/admin/posts'>
                      Admin posts
                    </Link>
                  </li>
                </>
              )}
              {session?.user ? (
                <>
                  <li className='nav-item ms-lg-3'>
                    <Link href='/bookmarks' className='nav-link'>
                      Bookmarks
                    </Link>
                  </li>
                  <li className='nav-item ms-lg-3'>
                    <Link href='/dashboard' className='nav-link'>
                      Dashboard
                    </Link>
                  </li>
                  <div className='d-flex align-items-center ms-lg-auto'>
                    <span className='me-3'>Hello, {session.user.email}</span>
                    <form action={logoutAction}>
                      <button className='btn btn-danger' type='submit'>
                        Logout
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link className='ms-3 nav-link' href='/login'>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='ms-3 nav-link' href='/register'>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        {/* <nav className='navbar bg-body-tertiary fixed-top'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              Offcanvas navbar
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasNavbar'
              aria-controls='offcanvasNavbar'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='offcanvas offcanvas-end'
              tabIndex='-1'
              id='offcanvasNavbar'
              aria-labelledby='offcanvasNavbarLabel'
            >
              <div className='offcanvas-header'>
                <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                  Offcanvas
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
                ></button>
              </div>
              <div className='offcanvas-body'>
                <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                  <li className='nav-item'>
                    <Link
                      href='/'
                      className='nav-link active'
                      aria-current='page'
                    >
                      Home
                    </Link>
                  </li>

                  {session?.user?.role === 'ADMIN' && (
                    <>
                      <li className='nav-item'>
                        <Link className='ms-3 nav-link' href='/admin/users'>
                          Table Users
                        </Link>
                      </li>

                      <li className='nav-item'>
                        <Link className='ms-3 nav-link' href='/admin/posts'>
                          Admin posts
                        </Link>
                      </li>
                    </>
                  )}
                  {session?.user ? (
                    <>
                      <li className='nav-item'>
                        <Link href='/bookmarks' className='ms-3 nav-link'>
                          Bookmarks
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link href='/dashboard' className='ms-3 nav-link'>
                          Dashboard
                        </Link>
                      </li>
                      <div className='d-flex align-items-center ms-auto'>
                        <span className='ms-3 me-3 ms-auto'>
                          Hello, {session.user.email}
                        </span>
                        <form action={logoutAction}>
                          <button className='btn btn-danger ' type='submit'>
                            Logout
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <>
                      <li className='nav-item'>
                        <Link className='ms-3 nav-link' href='/login'>
                          Login
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='ms-3 nav-link' href='/register'>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav> */}
      </div>
    </>
  );
};

export default NavItems;
