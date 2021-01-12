import './gallery.css';

import { FunctionComponent, ReactElement, useEffect } from 'react';

interface Properties {
  items: string[];
  title: string;
}

const Gallery: FunctionComponent<Properties> = (properties): ReactElement => {
  return (
    <div className="gallery">
      <h1>{properties.title}</h1>
      {properties.items.map(
        (item, index): ReactElement => (
          <img key={index} src={item} />
        ),
      )}
    </div>
  );
};

export default Gallery;
