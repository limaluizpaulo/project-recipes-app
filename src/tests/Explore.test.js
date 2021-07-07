import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Explore from '../pages/Explore';
import renderWithRouter from '../renderWithRouter';

describe('Checks Explore Page', () => {
  it('Cheks if the page has a profile button', () => {
    renderWithRouter(<Explore />);

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });

  it('Checks if the page has a title', () => {
    renderWithRouter(<Explore />);

    const titlePage = screen.getByTestId('page-title');
    expect(titlePage.innerHTML).toBe('Explorar');
  });

  it('Checks if the page has two buttons and redirect to respectively pages', () => {
    const { history } = renderWithRouter(<Explore />);

    const exploreMealsButton = screen.getByRole('button', {
      name: /explorar comidas/i,
    });

    expect(exploreMealsButton).toBeInTheDocument();

    userEvent.click(exploreMealsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');

    const exploreDrinksButton = screen.getByRole('button', {
      name: /explorar bebidas/i,
    });

    expect(exploreDrinksButton).toBeInTheDocument();

    userEvent.click(exploreDrinksButton);

    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/explorar/bebidas');
  });

  it('Check if the page has a footer', () => {
    renderWithRouter(<Explore />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
