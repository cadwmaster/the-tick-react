import './app.css';

import { ChangeEvent, Component } from 'react';

import Gallery from './components/gallery';
import ImageItem from './components/image-item';
import * as Analyzer from './helpers/analizer';
import * as DogAPI from './helpers/dog-api';
import Prediction from './types/prediction';

interface State {
  breeds: string[];
  currentBreed: string;
  currentImage?: string;
  items: string[];
  loading: boolean;
  predictions: Prediction[];
}

class App extends Component<object, State> {
  private constructor(properties: object) {
    super(properties);
    this.state = {
      breeds: [],
      currentBreed: '',
      currentImage: undefined,
      items: [],
      loading: false,
      predictions: [],
    };
  }

  public render(): React.ReactNode {
    return (
      <div className="app">
        <header className="app-header">
          <div className="file-container">
            <div className="file-input">
              <input
                type="file"
                id="file"
                className="file"
                onChange={this.handleInputFileChange}
              />
              <label htmlFor="file" className="button">
                Upload a 🐶
              </label>
            </div>
          </div>
          <div>Or</div>
          <div id="random-button" className="button" onClick={this.handleClick}>
            Get a Random 🐶
          </div>
        </header>
        <section>
          <ImageItem
            imagePath={this.state.currentImage}
            predictions={this.state.predictions}
            onLoad={this.handleLoad}
          />
        </section>
        <section>
          <Gallery
            title={`Breed: ${this.state.currentBreed}`}
            items={this.state.items}
            loading={this.state.loading}
          />
        </section>
      </div>
    );
  }

  private readonly handleClick = async (): Promise<void> => {
    this.initialize();
    const fetchedImage = await DogAPI.getRandom();

    this.setState({
      currentImage: fetchedImage,
    });
  };

  private readonly handleInputFileChange = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    const selectorFiles = target.files;

    this.initialize();

    if (selectorFiles !== null) {
      const objectURL = window.URL.createObjectURL(selectorFiles[0]);
      this.setState({ currentImage: objectURL });
    }
  };

  private readonly handleLoad = async (
    element: HTMLImageElement,
  ): Promise<void> => {
    this.setState({ items: [] });

    if (this.state.breeds.length === 0) {
      const breeds = await DogAPI.getListBreed();
      this.setState({ breeds });
    }

    const fetchedPredictions = await Analyzer.analyzeImage(element);
    this.setState({ predictions: fetchedPredictions });

    const filterPredictions = Analyzer.filterResults(
      fetchedPredictions,
      this.state.breeds,
    );

    if (filterPredictions.length > 0) {
      this.setState({ currentBreed: filterPredictions[0] });
      const fetchedItems = await DogAPI.getByBreed(filterPredictions[0]);
      this.setState({
        items: fetchedItems,
        loading: false,
      });
    }
  };

  private readonly initialize = (): void => {
    this.setState({
      currentBreed: '',
      currentImage: undefined,
      loading: true,
      predictions: [],
    });
  };
}

export default App;
