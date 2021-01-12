import '@tensorflow/tfjs-backend-cpu';

import * as mobilenet from '@tensorflow-models/mobilenet';

import Prediction from '../types/prediction';

const analyzeImage = async (image: HTMLImageElement): Promise<Prediction[]> => {
  return mobilenet.load().then(
    async (model: mobilenet.MobileNet): Promise<Prediction[]> => {
      return model.classify(image);
    },
  );
};

export { analyzeImage };
