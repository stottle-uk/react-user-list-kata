import { Item } from '@lists';
import { Link } from '@router';
import React from 'react';

interface OwnProps extends React.HTMLProps<HTMLDivElement> {
  items: Item[];
}

const CarouselItems: React.FC<OwnProps> = ({ items, className }) => {
  const setImage = (item: Item) => ({
    backgroundImage: `url("${item.images.hero3x1}")`
  });

  const getItem = (item: Item) => (
    <div key={item.id} className={className} style={setImage(item)}>
      <div className="carousel__title">
        <Link href={item.path}>{item.title}</Link>
        <p>{item.tagline}</p>
      </div>
    </div>
  );

  return <>{items && items.map(item => getItem(item))}</>;
};

export default CarouselItems;
