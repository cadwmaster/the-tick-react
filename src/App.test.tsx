/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { MockedResponse, rest } from 'msw';
import { setupServer } from 'msw/node';

import * as Analizer from './helpers/analizer';
jest.mock('./helpers/analizer');

const mockAnalyzeImage = Analizer.analyzeImage as jest.MockedFunction<
  typeof Analizer.analyzeImage
>;
const mockfilterResults = Analizer.filterResults as jest.MockedFunction<
  typeof Analizer.filterResults
>;

import App from './app';
import Prediction from './types/prediction';
const server = setupServer(
  rest.get(
    'https://dog.ceo/api/breeds/image/random',
    async (request, response, context): Promise<MockedResponse> => {
      return response(context.json({ message: 'image.jpg' }));
    },
  ),
  rest.get(
    'https://dog.ceo/api/breeds/list/all',
    async (request, response, context): Promise<MockedResponse> => {
      const listOfBreeds = {
        african: [],
        hound: ['afghan', 'basset'],
      };

      return response(context.json({ message: listOfBreeds }));
    },
  ),
  rest.get(
    'https://dog.ceo/api/breed/hound/afghan/images',
    async (request, response, context): Promise<MockedResponse> => {
      const imagesByBreed = ['image1.jpg', 'image2.jpg'];

      return response(context.json({ message: imagesByBreed }));
    },
  ),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

it('renders the application', () => {
  expect.hasAssertions();

  const { container } = render(<App />);

  expect(container.querySelector('.app-header')).toBeVisible();
});

it('handleClick is triggered', async () => {
  expect.hasAssertions();
  const { container } = render(<App />);

  const target = container.querySelector('#random-button') as TargetElement;
  userEvent.click(target);

  await waitFor(() => {
    expect(
      container.querySelector('.image-container img')?.getAttribute('src'),
    ).toBe('image.jpg');
  });
});

it('handleInputFileChange is triggered', async () => {
  expect.hasAssertions();

  window.URL.createObjectURL = (fileObject) => {
    return fileObject.name;
  };

  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const { container } = render(<App />);

  const target = container.querySelector('#file') as TargetElement;

  userEvent.upload(target, file);

  await waitFor(() => {
    expect(
      container.querySelector('.image-container img')?.getAttribute('src'),
    ).toBe('hello.png');
  });
});

it('handleLoad is triggered', (done) => {
  expect.hasAssertions();

  const delay = 100;

  mockAnalyzeImage.mockImplementation(
    async (): Promise<Prediction[]> => {
      return Promise.resolve([
        {
          className: 'african',
          probability: 10,
        },
      ]);
    },
  );

  mockfilterResults.mockImplementation(() => {
    return ['afghan hound'];
  });

  const { container } = render(<App />);

  const randomButton = container.querySelector(
    '#random-button',
  ) as TargetElement;
  const imageElement = container.querySelector(
    '.image-container img',
  ) as HTMLElement;

  userEvent.click(randomButton);

  new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
    .then(async () => {
      return new Promise((resolve) => {
        fireEvent(imageElement, new Event('load'));
        expect(imageElement.getAttribute('src')).toBe('image.jpg');
        setTimeout(resolve, delay);
      });
    })
    .then(async () => {
      const gallery = container.querySelector('.gallery');
      expect(gallery?.querySelector('h1')?.textContent).toBe(
        'Breed: afghan hound',
      );
      expect(gallery?.querySelectorAll('img')).toHaveLength(2);

      return Promise.resolve(true);
    })
    .then(async () => {
      return new Promise((resolve) => {
        mockfilterResults.mockImplementation(() => {
          return [];
        });

        fireEvent(imageElement, new Event('load'));
        setTimeout(resolve, delay);
      });
    })
    .then(() => {
      const gallery = container.querySelector('.gallery');
      expect(gallery?.querySelectorAll('img')).toHaveLength(0);
      done();
    })
    .catch((error) => {
      throw error;
    });
});
