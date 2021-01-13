import './gallery.css';

import { FunctionComponent, ReactElement } from 'react';

interface Properties {
  items: string[];
  title: string;
}

const Gallery: FunctionComponent<Properties> = (properties): ReactElement => {
  return (
    <div className="gallery">
      <h1>{properties.title}</h1>
      <div className="images-container">
        {properties.items.map(
          (item, index): ReactElement => (
            <div key={index} className="image-container">
              <img src={item} width="200" />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Gallery;
