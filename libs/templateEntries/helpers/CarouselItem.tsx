import { Item } from '@lists';
import React from 'react';

interface OwnProps extends React.HTMLProps<HTMLDivElement> {
  item: Item;
}

const CarouselItem: React.FC<OwnProps> = ({ item, className, children }) => (
  <div
    key={item.id}
    className={className}
    style={{
      backgroundImage: `url("${item.images.hero3x1}")`
    }}
  >
    <>{children}</>
  </div>
);

export default CarouselItem;
