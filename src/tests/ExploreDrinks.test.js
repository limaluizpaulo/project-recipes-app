import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DrinksProvider from '../context/DrinksProvider';
import ExploreDrinks from '../pages/ExploreDrinks';
import renderWithRouter from '../renderWithRouter';

describe('Checks ExploreDrinks Page', () => {
  it('Cheks if the page has a profile button', () => {
    renderWithRouter(
      <DrinksProvider>
        <ExploreDrinks />
      </DrinksProvider>,
    );

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });

  it('Checks if the page has a title', () => {
    renderWithRouter(
      <DrinksProvider>
        <ExploreDrinks />
      </DrinksProvider>,
    );

    const titlePage = screen.getByTestId('page-title');
    expect(titlePage.innerHTML).toBe('Explorar Bebidas');
  });

  it('Checks if the page has three buttons and redirect to respectively pages', () => {
    const { history } = renderWithRouter(
      <DrinksProvider>
        <ExploreDrinks />
      </DrinksProvider>,
    );

    const ingredientsButton = screen.getByRole('button', {
      name: /por ingredientes/i,
    });

    expect(ingredientsButton).toBeInTheDocument();

    userEvent.click(ingredientsButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas/ingredientes');

    const surpriseRecipesButton = screen.getByRole('button', {
      name: /me surpreenda!/i,
    });

    expect(surpriseRecipesButton).toBeInTheDocument();
  });

  it('Check if the page has a footer', () => {
    renderWithRouter(
      <DrinksProvider>
        <ExploreDrinks />
      </DrinksProvider>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
