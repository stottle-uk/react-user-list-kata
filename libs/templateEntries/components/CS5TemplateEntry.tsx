import { Item, List } from '@lists';
import { Link } from '@router';
import React from 'react';
import GetMore from '../helpers/GetMore';
import './P2TemplateEntry.css';

class CS5TemplateEntry extends React.PureComponent<List> {
  render() {
    return (
      <div className="col">
        <h1>{this.props.title}</h1>
        <h2>{this.props.tagline}</h2>

        <div className="columns is-multiline is-gapless">
          {this.renderList(this.props.items)}
          <GetMore className="test" page={this.props.paging}>
            More
          </GetMore>
        </div>
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
