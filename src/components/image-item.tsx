import './image-item.css';

import React, { Component, ReactElement, SyntheticEvent } from 'react';

import emptyItem from '../assets/empty_item.svg';
import Prediction from '../types/prediction';

interface ItemProperties {
  id: string;
  imagePath?: string;
  onLoad: (event: HTMLImageElement) => void;
  predictions: Prediction[];
  title: string;
}

class ImageItem extends Component<ItemProperties> {
  public static defaultProps = {
    imagePath: emptyItem,
  };

  public render(): React.ReactNode {
    return (
      <div className="item-container">
        <img
          src={this.props.imagePath}
          onLoad={this.notifyParent}
          crossOrigin="anonymous"
        />
        {this.props.predictions.length > 0 && (
          <div>
            <h2>Predictions</h2>
            <ul>
              {this.props.predictions.map(
                (prediction, index): ReactElement => (
                  <li key={index}>{prediction.className}</li>
                ),
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  private readonly notifyParent = (event: SyntheticEvent): void => {
    const element = event.target as HTMLImageElement;

    this.props.onLoad(element);
  };
}

export default ImageItem;
