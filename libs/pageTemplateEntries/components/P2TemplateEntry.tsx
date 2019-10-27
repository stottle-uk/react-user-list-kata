import { Item } from '@lists';
import { Link } from '@router';
import React from 'react';
import ScrollHorizontal from '../helpers/ScrollHorizontal';
import { ListEntry } from '../models/pageEntryTemplates';

class P2PageEntry extends React.PureComponent<ListEntry> {
  render() {
    const { list } = this.props;

    return (
      <article className="content">
        <p className="column-header">
          <Link className="has-text-white is-capitalized" href={list.path}>
            {list.title}
          </Link>
        </p>
        <ScrollHorizontal path={list.path} className="columns is-gapless">
          {this.renderList(list.items)}
        </ScrollHorizontal>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </article>
    );
  }

  private renderList(items: Item[]): React.ReactNodeArray {
    return (
      items &&
      items.map(item => (
        <div
          className="column is-6-mobile is-4-tablet is-3-desktop is-2-widescreen"
          key={item.id}
        >
          <Link
            href={item.path}
            className="image is-2by3"
            style={{
              backgroundImage: `url("${item.images && item.images.poster}")`,
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

export default P2PageEntry;
