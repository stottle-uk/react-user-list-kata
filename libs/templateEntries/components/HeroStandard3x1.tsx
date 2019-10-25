import { Item, List } from '@lists';
import { Link } from '@router';
import React from 'react';
import Carousel from '../helpers/Carousel';
import CarouselItem from '../helpers/CarouselItem';

class HeroStandard3x1 extends React.PureComponent<List> {
  render() {
    return (
      <Carousel className="carousel" intervalTime={2000}>
        {this.renderItems()}
      </Carousel>
    );
  }

  private renderItems = () => {
    const { items } = this.props;
    return (
      items &&
      items.map(item => (
        <CarouselItem className="carousel__item image is-3by1" item={item}>
          {this.renderItemChildren(item)}
        </CarouselItem>
      ))
    );
  };

  private renderItemChildren = (item: Item) => (
    <div className="carousel__title">
      <Link href={item.path}>{item.title}</Link>
      <p>{item.tagline}</p>
    </div>
  );
}

export default HeroStandard3x1;
