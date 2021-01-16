import { cleanup, render } from '@testing-library/react';

import Gallery from './gallery';

afterEach(cleanup);

it('renders without required properties', (): void => {
  expect.hasAssertions();
  const { container } = render(<Gallery items={[]} />);

  expect(container.querySelector('.gallery')).toBeVisible();
});

it('renders with loading message', (): void => {
  expect.hasAssertions();
  const { container } = render(<Gallery items={[]} loading={true} />);

  expect(container.querySelector('[aria-label="animation"]')).toBeVisible();
  expect(container.querySelector('.loading')).toBeVisible();
});

it('renders with title and items', (): void => {
  expect.hasAssertions();
  const properties = {
    items: ['image1.jpg', 'image2.jpg'],
    title: 'Title',
  };

  const { container } = render(<Gallery {...properties} />);

  expect(container.querySelector('h1')?.textContent).toBe(properties.title);
  const images = container.querySelector('.images-container');
  expect(images).toBeVisible();
  expect(images?.childNodes).toHaveLength(properties.items.length);
  expect(images?.querySelector('img')?.getAttribute('src')).toBe(
    properties.items[0],
  );
});
