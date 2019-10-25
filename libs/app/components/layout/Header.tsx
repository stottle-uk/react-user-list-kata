import { getHeader, NavEntry } from '@config';
import { Link } from '@router';
import { RootState } from '@store';
import React from 'react';
import { Container, Navbar } from 'react-bulma-components';
import { connect } from 'react-redux';

interface StoreProps {
  navContent: NavEntry[];
}

const Header: React.FC<StoreProps> = ({ navContent }) => (
  <Navbar className="is-fixed-top has-background-black">
    <Container>
      <div className="navbar-start">
        <div className="navbar-brand">
          <Link className="navbar-item has-text-white" href="/">
            Home
          </Link>
          {navContent.map((f, t) => {
            return !!f.children ? (
              <div key={t} className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link has-text-white" href={f.path}>
                  {f.label}
                </Link>

                <div className="navbar-dropdown has-background-black">
                  {f.children.map((c, j) => {
                    return !!c.children ? (
                      c.children.map((cc, i) => {
                        return (
                          <Link
                            key={i}
                            className="navbar-item has-text-white"
                            href={cc.path}
                          >
                            {cc.label}
                          </Link>
                        );
                      })
                    ) : (
                      <span key={j} />
                    );
                  })}
                </div>
              </div>
            ) : (
              <Link
                key={t}
                className="navbar-item has-text-white"
                href={f.path}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>
    </Container>
  </Navbar>
);

const mapStateToProps = ({ config }: RootState): StoreProps => ({
  navContent: getHeader(config)
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(Header);
