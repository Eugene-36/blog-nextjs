'use client';

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { signOut } from 'next-auth/react';

const NavItems = () => {
  return (
    <>
      <div className='container pt-3 pb-3'>
        <Nav className='justify-content-center' activeKey='/home'>
          <Nav.Item>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/login' eventKey='link-1'>
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='register' eventKey='link-2'>
              Register
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='/bookmarks' eventKey='link-3'>
              Bookmarks
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className='ms-auto'>
            <button type='button' className='btn btn-danger'>
              <Nav.Link
                className='p-0 text-white'
                href='#'
                eventKey='link-3'
                onClick={() => signOut({ redirectTo: '/login' })}
              >
                Log Out
              </Nav.Link>
            </button>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
};

export default NavItems;
