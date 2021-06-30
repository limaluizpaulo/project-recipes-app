import React from 'react';
import Search from '../components/Search';
import renderWithRoute from './renderWithRoute';

describe('Renders the Search', () => {
  it('should render the input type text ', () => {
    const { getByTestId } = renderWithRoute(<Search />);

    const search = getByTestId('search-input');
    expect(search).toBeInTheDocument();
  });

  it('should render the input type checkbox for ingredients ', () => {
    const { getByTestId } = renderWithRoute(<Search />);

    const checkbox = getByTestId('ingredient-search-radio');
    expect(checkbox).toBeInTheDocument();
  });
});
