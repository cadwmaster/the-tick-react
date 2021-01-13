import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ImageItem from './image-item';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with or without an image', () => {
  const predictions = [];
  act(() => {
    render(<ImageItem predictions={predictions} />, container);
  });
  expect(container.querySelector('img').getAttribute('src')).toBe(
    'empty_item.svg',
  );

  act(() => {
    render(
      <ImageItem predictions={predictions} imagePath="image.jpg" />,
      container,
    );
  });
  expect(container.querySelector('img').getAttribute('src')).toBe('image.jpg');
});

it('renders with or without predictions', () => {
  const predictions = [
    {
      className: 'first',
      probability: 10,
    },
  ];

  act(() => {
    render(<ImageItem predictions={[]} />, container);
  });
  expect(container.querySelector('.message-container').textContent).toBe(
    'Upload an image of a dog or click Get Lucky',
  );

  act(() => {
    render(<ImageItem predictions={predictions} />, container);
  });
  expect(container.querySelector('.message-container')).toBeNull();
  expect(container.querySelector('.predictions-container h2').textContent).toBe(
    'Predictions',
  );
  expect(container.querySelector('.predictions-container li').textContent).toBe(
    'first',
  );
});
