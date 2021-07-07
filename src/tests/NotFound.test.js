import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';

describe('Checks NotFound ', () => {
  it('Checks if the page has a header', () => {
    render(<NotFound />);

    const titlePage = screen.getByRole('heading', {
      name: /not found/i,
    });
    expect(titlePage).toBeInTheDocument();
  });

  it('Checks if the page has a image', () => {
    render(<NotFound />);

    const imagePage = screen.getByAltText('Página não encontrada');
    expect(imagePage).toBeInTheDocument();
  });
});
