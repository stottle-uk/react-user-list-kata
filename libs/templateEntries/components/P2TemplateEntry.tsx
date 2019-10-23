import { Item, List } from '@lists';
import { Link } from '@router';
import React from 'react';
import './P2TemplateEntry.css';

class P2PageEntry extends React.PureComponent<List> {
  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <h2>
            <Link href={this.props.path}>
              {this.props.title} <small>{this.props.id}</small>
            </Link>
          </h2>
        </div>
        <div className="columns is-gapless">
          {this.renderList(this.props.items)}
        </div>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    );
  }

  private renderList(items: Item[]): React.ReactNodeArray {
    return (
      items &&
      items.map(item => (
        <div className="column is-1" key={item.id}>
          <Link href={item.path}>
            <img
              className="image"
              src={item.images ? item.images.poster : ''}
              alt=""
            />
          </Link>
        </div>
      ))
    );
  }
}

export default P2PageEntry;
