import React from 'react';
import RouterLink from '../../../../libs/router/Link';
import { routerContext } from '../routerContext';

const Link = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <RouterLink routerContext={routerContext} {...props}></RouterLink>
);

export default Link;
