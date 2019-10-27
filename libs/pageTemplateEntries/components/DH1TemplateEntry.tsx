import { ItemEntry } from '@pageTemplateEntries';
import React from 'react';

const DH1TemplateEntry: React.FC<ItemEntry> = ({ item }) => (
  <div key={item.id}>
    <div
      className="image is-16by9"
      style={{
        backgroundImage: `url("${item.images && item.images.wallpaper}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    ></div>
  </div>
);

export default DH1TemplateEntry;
