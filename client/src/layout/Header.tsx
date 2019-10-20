import React from 'react';
import { Container, Navbar } from 'react-bulma-components';
import Link from '../router/components/Link';

const Header = () => (
  <Navbar className="is-fixed-top has-shadow">
    <Container>
      <div className="navbar-start">
        <div className="navbar-brand">
          <span className="navbar-item">User List Kata</span>
          <Link className="navbar-item" href="/">
            Home
          </Link>
          <Link className="navbar-item" href="/users">
            Users
          </Link>
        </div>
      </div>
    </Container>
  </Navbar>
);

export default Header;
