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

const filterResults = (
  predictions: Prediction[],
  dataSet: string[],
): string[] => {
  const results: string[] = [];
  predictions.forEach((prediction): void => {
    const predictionItem = prediction.className.split(',');

    predictionItem.forEach((word): void => {
      const cleanWord = word.toLowerCase().trim();
      const found = dataSet.find(
        (element): boolean => element.toLowerCase() === cleanWord,
      );

      if (found !== undefined) {
        results.push(found);
      }
    });
  });

  return results;
};

export { analyzeImage, filterResults };
