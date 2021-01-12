import './gallery.css';

import { FunctionComponent, ReactElement } from 'react';

import Item from '../types/item';

interface Properties {
  items: Item[];
  title: string;
}

const Gallery: FunctionComponent<Properties> = (properties): ReactElement => {
  return (
    <div className="gallery">
      <h1>{properties.title}</h1>
      {properties.items.map(
        (item, index): ReactElement => (
          <div key={index}>{item.imagePath}</div>
        ),
      )}
    </div>
  );
};

export default Gallery;
