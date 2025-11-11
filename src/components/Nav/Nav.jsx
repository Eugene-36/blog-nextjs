'use client';

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { signOut } from 'next-auth/react';

const NavItems = () => {
  return (
    <>
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
          <Nav.Link
            href='#'
            eventKey='link-3'
            onClick={() => signOut({ redirectTo: '/login' })}
          >
            Log Out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavItems;
