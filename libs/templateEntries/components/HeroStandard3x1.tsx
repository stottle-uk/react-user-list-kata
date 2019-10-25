import { List } from '@lists';
import React from 'react';
import Carousel from '../helpers/Carousel';
import CarouselItems from '../helpers/CarouselItems';

class HeroStandard3x1 extends React.PureComponent<List> {
  render() {
    return (
      <Carousel className="carousel" intervalTime={2000}>
        <CarouselItems
          className="carousel__item image is-3by1"
          items={this.props.items}
        />
      </Carousel>
    );
  }
}

export default HeroStandard3x1;
