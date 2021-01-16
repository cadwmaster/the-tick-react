/* eslint-disable jest/no-done-callback */

import { MockedResponse, rest } from 'msw';
import { setupServer } from 'msw/node';

import { getByBreed, getListBreed, getRandom } from './dog-api';

const server = setupServer(
  rest.get(
    'https://dog.ceo/api/breeds/image/random',
    async (request, response, context): Promise<MockedResponse> => {
      return response(context.json({ message: 'message' }));
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

beforeAll((): void => {
  server.listen();
});

afterEach((): void => {
  server.resetHandlers();
});

afterAll((): void => {
  server.close();
});

it('getRandom - make the API call and return the filtered response', (done): void => {
  expect.hasAssertions();

  getRandom()
    .then((message): void => {
      expect(message).toBe('message');
      done();
    })
    .catch((error): void => {
      throw error;
    });
});

it('getListBreed - make the API call and return the normalize response', (done): void => {
  expect.hasAssertions();

  const normalizeList = ['african', 'hound', 'afghan hound', 'basset hound'];

  getListBreed()
    .then((message): void => {
      expect(message).toStrictEqual(normalizeList);
      done();
    })
    .catch((error): void => {
      throw error;
    });
});

it('getByBreed - make the API call and return the normalize response', (done): void => {
  expect.hasAssertions();

  const imagesByBreed = ['image1.jpg', 'image2.jpg'];

  getByBreed('afghan hound')
    .then((message): void => {
      expect(message).toStrictEqual(imagesByBreed);
      done();
    })
    .catch((error): void => {
      throw error;
    });
});
