import './image-item.css';

import React, { Component } from 'react';

import emptyItem from '../assets/empty_item.svg';

interface ItemProperties {
  id: string;
  imagePath?: string;
  metadata?: {
    breed?: string;
    probability?: number;
  };
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
          alt={this.props.metadata?.breed ?? 'empty'}
        />
      </div>
    );
  }
}

export default ImageItem;
