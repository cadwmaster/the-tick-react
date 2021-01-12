import './app.css';

import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import Gallery from './components/gallery';
import ImageItem from './components/image-item';
import * as Analyzer from './helpers/analizer';
import * as DogAPI from './helpers/dog-api';
import Prediction from './types/prediction';

const App: FunctionComponent = (): ReactElement => {
  const [currentImage, setCurrentImage] = useState<string>();
  const [items, setItems] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentBreed, setCurrentBreed] = useState<string>('');

  useEffect((): void => {
    DogAPI.getListBreed()
      .then(setBreeds)
      .catch((error): void => {
        throw error;
      });
  }, []);

  const handleClick = async (): Promise<void> => {
    setPredictions([]);
    setItems([]);
    setCurrentBreed('');
    const fetchedImage = await DogAPI.getRandom();
    setCurrentImage(fetchedImage);
  };

  const handleLoad = async (element: HTMLImageElement): Promise<void> => {
    const fetchedPredictions = await Analyzer.analyzeImage(element);
    setPredictions(fetchedPredictions);
    const filterPredictions = Analyzer.filterResults(
      fetchedPredictions,
      breeds,
    );

    if (filterPredictions.length > 0) {
      setCurrentBreed(filterPredictions[0]);
      const fetchedItems = await DogAPI.getByBreed(filterPredictions[0]);
      setItems(fetchedItems);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={handleClick}>Get a Random Dog</div>
      </header>
      <section>
        <ImageItem
          imagePath={currentImage}
          predictions={predictions}
          onLoad={handleLoad}
        />
      </section>
      <section>
        <Gallery title={`Breed: ${currentBreed}`} items={items} />
      </section>
    </div>
  );
};

export default App;
