import { List } from '@lists';
import React from 'react';

class LH1TemplateEntry extends React.PureComponent<List> {
  render() {
    const { title, tagline } = this.props;

    return (
      <div className="card">
        <div className="card-content">
          <h1 className="is-size-3">{title}</h1>
          <h2 className="is-size-5">{tagline}</h2>
        </div>
      </div>
    );
  }
}

export default LH1TemplateEntry;
