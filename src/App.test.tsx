import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './app';

describe('app', (): void => {
  it('renders learn react link', (): void => {
    expect.hasAssertions();
    render(<App />);
    const linkElement = screen.getByText(/learn react/iu);
    expect(linkElement).toBeInTheDocument();
  });
});
