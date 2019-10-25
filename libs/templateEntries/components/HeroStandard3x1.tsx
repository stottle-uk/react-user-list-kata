import { Item, List } from '@lists';
import { Link } from '@router';
import React from 'react';
import Carousel from '../helpers/Caurosel';
import './HeroStandard3x1.css';

class HeroStandard3x1 extends React.PureComponent<List> {
  render() {
    return (
      <Carousel className="swiper" intervalTime={2000}>
        {this.props.items && this.renderCarouselItems(this.props.items)}
      </Carousel>
    );
  }

  private renderCarouselItems(items: Item[]): React.ReactNodeArray {
    return items.map(item => (
      <div
        className="swiper__item image is-3by1"
        key={item.id}
        style={this.setImage(item)}
      >
        <div className="item__title">
          <Link href={item.path}>{item.title}</Link>
          <p>{item.tagline}</p>
        </div>
      </div>
    ));
  }

  private setImage = (item: Item) => ({
    backgroundImage: `url("${item.images.hero3x1}")`
  });
}

export default HeroStandard3x1;
