import React from 'react';

export interface RouterConfigRoute<T> {
  name: string;
  path: string;
  template: React.ComponentType<T>;
}
