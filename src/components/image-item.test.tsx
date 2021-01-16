import { cleanup, fireEvent, render } from '@testing-library/react';

import ImageItem from './image-item';

afterEach(cleanup);

it('renders without an image', (): void => {
  expect.hasAssertions();
  const { container } = render(<ImageItem predictions={[]} />);

  expect(container.querySelector('img')?.getAttribute('src')).toBe(
    'empty_item.svg',
  );
});

it('renders with an image', (): void => {
  expect.hasAssertions();
  const { container } = render(
    <ImageItem predictions={[]} imagePath="image.jpg" />,
  );

  expect(container.querySelector('img')?.getAttribute('src')).toBe('image.jpg');
});

it('renders without predictions', (): void => {
  expect.hasAssertions();
  const { container } = render(<ImageItem predictions={[]} />);

  expect(container.querySelector('.message-container')?.textContent).toBe(
    'Upload an image of a dog or click Get Lucky',
  );
});

it('renders with predictions', (): void => {
  expect.hasAssertions();
  const predictions = [
    {
      className: 'first',
      probability: 10,
    },
  ];

  const { container } = render(<ImageItem predictions={predictions} />);

  expect(container.querySelector('.message-container')).toBeNull();
  expect(
    container.querySelector('.predictions-container h2')?.textContent,
  ).toBe('Predictions');
  expect(
    container.querySelector('.predictions-container li')?.textContent,
  ).toBe('first');
});

it('trigger handler function for onLoad', async (): Promise<void> => {
  expect.hasAssertions();
  const handler = jest.fn();

  const { container } = render(
    <ImageItem predictions={[]} imagePath="image.jpg" onLoad={handler} />,
  );

  const img = container.querySelector('img');

  if (img !== null) {
    fireEvent(img, new Event('load'));
  }

  expect(handler).toHaveBeenCalled();
});

it('not trigger handler function for onLoad if imagePath is not set', async (): Promise<void> => {
  expect.hasAssertions();
  const handler = jest.fn();

  const { container } = render(<ImageItem predictions={[]} onLoad={handler} />);

  const img = container.querySelector('img');

  if (img !== null) {
    fireEvent(img, new Event('load'));
  }

  expect(handler).not.toHaveBeenCalled();
});
