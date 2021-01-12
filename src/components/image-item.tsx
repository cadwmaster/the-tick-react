import './image-item.css';

import React, { Component, ReactElement, SyntheticEvent } from 'react';

import emptyItem from '../assets/empty_item.svg';
import Prediction from '../types/prediction';

interface ItemProperties {
  imagePath?: string;
  onLoad: (event: HTMLImageElement) => void;
  predictions: Prediction[];
}

const messages: { empty: string; loading: string } = {
  empty: 'Upload an image of a dog or click Get Lucky',
  loading: 'The image is been analyzed wait a couple of seconds',
};

class ImageItem extends Component<ItemProperties> {
  public render(): React.ReactNode {
    const showPredictions = this.props.predictions.length > 0;
    const showEmpty = this.props.imagePath === undefined;

    return (
      <div className="item-container">
        <div className="image-container">
          <img
            src={this.props.imagePath ?? emptyItem}
            onLoad={this.notifyParent}
            crossOrigin="anonymous"
          />
        </div>
        {showPredictions ? (
          <div className="predictions-container">
            <h2>Predictions</h2>
            <ul>
              {this.props.predictions.map(
                (prediction, index): ReactElement => (
                  <li key={index}>{prediction.className}</li>
                ),
              )}
            </ul>
          </div>
        ) : (
          <div className="message-container">
            {showEmpty ? messages.empty : messages.loading}
          </div>
        )}
      </div>
    );
  }

  private readonly notifyParent = (event: SyntheticEvent): void => {
    const element = event.target as HTMLImageElement;

    if (this.props.imagePath !== undefined) {
      this.props.onLoad(element);
    }
  };
}

export default ImageItem;
