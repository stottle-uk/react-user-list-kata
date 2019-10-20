import React, { useContext } from 'react';
import { BrowserRouter } from './services/BrowserRouter';

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  routerContext: React.Context<BrowserRouter<any>>;
}

const Link = ({ routerContext, href, children, ...rest }: LinkProps) => {
  const { history } = useContext(routerContext);
  // if (!matchRoute(href)) {
  //   console.warn('Path does not exist in router', href);
  // }
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    history.go(event.currentTarget.pathname);
  };

  return (
    <a {...rest} onClick={handleClick} href={href}>
      {children}
    </a>
  );
};

export default Link;
