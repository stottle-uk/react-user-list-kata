import { Item, List } from '@lists';
import { Link } from '@router';
import React from 'react';
import './P2TemplateEntry.css';

class P2PageEntry extends React.PureComponent<List> {
  render() {
    return (
      <article className="panel is-primary">
        <p className="panel-heading">
          <Link href={this.props.path}>
            {this.props.title} <small>{this.props.id}</small>
          </Link>
        </p>
        <div className="columns is-gapless">
          {this.renderList(this.props.items)}
        </div>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </article>
    );
  }

  private renderList(items: Item[]): React.ReactNodeArray {
    return (
      items &&
      items.map(item => (
        <div className="column is-1" key={item.id}>
          <Link
            href={item.path}
            className="image is-2by3"
            style={{
              backgroundImage: `url("${item.images.poster}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          ></Link>
        </div>
      ))
    );
  }
}

export default P2PageEntry;
