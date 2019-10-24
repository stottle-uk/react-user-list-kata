import { Item, List } from '@lists';
import { Link } from '@router';
import React from 'react';
import ScrollLoader from '../helpers/ScrollLoader';
import './P2TemplateEntry.css';

class CS5TemplateEntry extends React.PureComponent<List> {
  render() {
    const { title, tagline, paging, items } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h2>{tagline}</h2>

        <ScrollLoader className="columns is-multiline is-gapless" page={paging}>
          {this.renderList(items)}
        </ScrollLoader>
      </div>
    );
  }

  private renderList(items: Item[]) {
    return (
      items &&
      items.map(item => (
        <div
          className="column is-6-mobile is-4-tablet is-3-desktop"
          key={item.id}
        >
          <Link
            href={item.path}
            className="image is-2by3"
            style={{
              backgroundImage: `url("${item.images.poster}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      ))
    );
  }
}

export default CS5TemplateEntry;
