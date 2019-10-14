import React from 'react';
import { Container, Navbar } from 'react-bulma-components';

const Header = () => (
  <Navbar className="is-fixed-top has-shadow">
    <Container>
      <div className="navbar-start">
        <div className="navbar-brand">
          <span className="navbar-item">User List Kata</span>
        </div>
      </div>
    </Container>
  </Navbar>
);

export default Header;
