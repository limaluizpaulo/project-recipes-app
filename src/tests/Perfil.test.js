import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from '../renderWithRouter';
import Profile from '../pages/Profile';

describe('Checks Login Page', () => {
  it('Cheks if the page has a profile button', () => {
    renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });

  it('Checks if the page has a title', () => {
    renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const titlePage = screen.getByTestId('page-title');
    expect(titlePage.innerHTML).toBe('Perfil');
  });

  it('Checks if the page has a user email', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        user: {
          email: 'exemplo@exemplo.com',
        },
        writable: true,
      },
    });

    renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );
  });

  it('Checks if the page has two button about recipes ', () => {
    renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const recipesMadeButton = screen.getByTestId('profile-done-btn');
    expect(recipesMadeButton).toBeInTheDocument();

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesButton).toBeInTheDocument();
  });

  it('Checks if the buttons redirect to respectively pages', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const recipesMadeButton = screen.getByTestId('profile-done-btn');
    expect(recipesMadeButton).toBeInTheDocument();

    userEvent.click(recipesMadeButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/receitas-feitas');

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipesButton).toBeInTheDocument();

    userEvent.click(favoriteRecipesButton);

    const { pathname: pathname2 } = history.location;
    expect(pathname2).toBe('/receitas-favoritas');
  });

  it('Check if  the page has a Logout button and redirect to the Login page', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const logOutButton = screen.getByTestId('profile-logout-btn');
    expect(logOutButton).toBeInTheDocument();

    userEvent.click(logOutButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Check if the page has a footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
