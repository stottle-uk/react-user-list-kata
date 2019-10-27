import { Item } from '@lists';
import { Link } from '@router';
import React from 'react';
import Carousel from '../helpers/Carousel';
import CarouselItem from '../helpers/CarouselItem';
import { ListEntry } from '../models/pageEntryTemplates';

class HeroStandard3x1 extends React.PureComponent<ListEntry> {
  render() {
    return (
      <Carousel className="carousel" intervalTime={2000}>
        {this.renderItems()}
      </Carousel>
    );
  }

  private renderItems = () => {
    const { list } = this.props;
    return list.items.map(item => (
      <CarouselItem
        key={item.id}
        className="carousel__item image is-3by1"
        item={item}
      >
        {this.renderItemChildren(item)}
      </CarouselItem>
    ));
  };

  private renderItemChildren = (item: Item) => (
    <div className="is-size-3 carousel__title">
      <Link className="has-text-white" href={item.path}>
        {item.title}
      </Link>
      <p>{item.tagline}</p>
    </div>
  );
}

export default HeroStandard3x1;
