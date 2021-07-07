import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from '../renderWithRouter';

describe('Checks Footer', () => {
  it('Checks if the Footer has three buttons and redirect to respectively pages', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();

    userEvent.click(drinksButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');

    const exploreButton = screen.getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    userEvent.click(exploreButton);
    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/explorar');

    const mealsButton = screen.getByTestId('food-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    userEvent.click(mealsButton);
    const { pathname: pathname3 } = history.location;
    expect(pathname3).toBe('/comidas');
  });
});
