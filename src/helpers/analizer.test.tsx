import { analyzeImage, filterResults } from './analizer';

jest.mock('@tensorflow-models/mobilenet');

it('analyzeImage - Load and call clasify with the image element', async (): Promise<void> => {
  expect.hasAssertions();

  const image = new Image();

  const predictions = await analyzeImage(image);

  expect(predictions).toStrictEqual([
    {
      className: 'classname',
      probability: 1,
    },
  ]);
});

it('filterResults - Given a prediction response, compare with a list a return the results', (): void => {
  expect.hasAssertions();

  const list = ['category_A', 'category_B', 'category_C'];
  const predictions = [
    {
      className: 'CaTeGory_a',
      probability: 1,
    },
    {
      className: 'CaTeGory_c',
      probability: 2,
    },
  ];

  const results = filterResults(predictions, list);

  expect(results).toStrictEqual(['category_A', 'category_C']);
});

it('filterResults - Given a prediction that is not part of the list,return an empty array', (): void => {
  expect.hasAssertions();

  const list = ['category_A', 'category_B', 'category_C'];
  const predictions = [
    {
      className: 'CaTeGory_d',
      probability: 1,
    },
  ];

  const results = filterResults(predictions, list);

  expect(results).toStrictEqual([]);
});
