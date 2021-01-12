import './app.css';

import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import Gallery from './components/gallery';
import ImageItem from './components/image-item';
import * as Analyzer from './helpers/analizer';
import * as DogAPI from './helpers/dog-api';
import Breed from './types/breed';
import Item from './types/item';
import Prediction from './types/prediction';

const App: FunctionComponent = (): ReactElement => {
  const [currentDog, setCurrentDog] = useState<Item>({});
  const [items, setItems] = useState<Item[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect((): void => {
    DogAPI.getListBreed()
      .then(setBreeds)
      .catch((error): void => {
        throw error;
      });
  }, []);

  const handleClick = (): void => {
    setPredictions([]);
    DogAPI.getRandom()
      .then((image): void => {
        setCurrentDog({ imagePath: image });
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

  const handleLoad = (element: HTMLImageElement): void => {
    Analyzer.analyzeImage(element)
      .then(setPredictions)
      .catch((error): void => {
        throw error;
      });
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
          predictions={predictions}
          onLoad={handleLoad}
        />
      </section>
      <section>
        <Gallery title="The title" items={items} />
      </section>
    </div>
  );
};

export default App;
