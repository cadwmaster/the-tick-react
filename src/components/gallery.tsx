import './gallery.css';

import { FunctionComponent, ReactElement } from 'react';
import Lottie from 'react-lottie';

import happyDog from '../assets/happy-dog.json';

interface Properties {
  items: string[];
  loading?: boolean;
  title?: string;
}

const loadingMessages: string[] = [
  'Just wait a bit until we get some results',
  'Be there soon... our minions are working on it',
  'Close your eyes count until 10 and the results will be there',
];

const lottieOptions = {
  animationData: happyDog,
  autoplay: true,
  loop: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Gallery: FunctionComponent<Properties> = (properties): ReactElement => {
  if (properties.loading === true) {
    return (
      <div className="gallery">
        <Lottie options={lottieOptions} height={200} width={200} />
        <div className="loading">
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </div>
      </div>
    );
  }

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

Gallery.defaultProps = {
  items: [],
  loading: false,
  title: '',
};

export default Gallery;
