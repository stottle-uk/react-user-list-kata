import React from 'react';
import { ImageEntry } from '../../models/pageTemplateEntries';

const EditorialImage: React.FC<ImageEntry> = ({ images, customFields }) => {
  const caption = customFields ? customFields.caption : '';
  const image = Object.values(images).find(image => image);

  return (
    <div
      className="content image is-4by1 editorial-image"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h3 className="is-size-2 is-uppercase has-text-white caption">
        {caption}
      </h3>
    </div>
  );
};

export default EditorialImage;
