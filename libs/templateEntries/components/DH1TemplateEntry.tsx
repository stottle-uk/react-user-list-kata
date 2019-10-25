import { Item } from '@lists';
import React from 'react';

const DH1TemplateEntry: React.FC<Item> = ({ images }) => (
  <div>
    <div
      className="image is-16by9"
      style={{
        backgroundImage: `url("${images && images.wallpaper}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    ></div>
  </div>
);

export default DH1TemplateEntry;
