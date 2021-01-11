import './app.css';

import { FunctionComponent, ReactElement, useState } from 'react';

import Gallery from './components/gallery';
import ImageItem from './components/image-item';
import * as DogAPI from './helpers/dog-api';
import Item from './types/item';

const App: FunctionComponent = (): ReactElement => {
  const [currentDog, setCurrentDog] = useState<Item>({});
  const [items, setItems] = useState<Item[]>([]);

  const handleClick = (): void => {
    DogAPI.getRandom()
      .then((image): void => {
        setCurrentDog({
          imagePath: image,
        });
      })
      .catch((error): void => {
        throw error;
      });

    setItems([
      {
        imagePath: 'something.jpg',
      },
      {
        imagePath: 'something-else.jpg',
      },
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          onClick={(): void => {
            handleClick();
          }}
        >
          Get a Random Dog
        </div>
      </header>
      <section>
        <ImageItem
          id="something"
          title="title"
          imagePath={currentDog.imagePath}
        />
      </section>
      <section>
        <Gallery title="The title" items={items} />
      </section>
    </div>
  );
};

export default App;
