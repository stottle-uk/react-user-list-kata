import { RouterConfigRoute } from '@router';
import React from 'react';
import './App.scss';

const PageNotFound: React.FC<RouterConfigRoute> = route => (
  <div className="content">
    <h1 className="is-size-2 has-text-white">
      `{route.template}` - Route Not Found (404)
    </h1>
    <pre>{JSON.stringify(route, undefined, 2)}</pre>
  </div>
);

export default PageNotFound;
