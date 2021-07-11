import React from 'react';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
// import MealsContextProvider from '../context/mealsContext';
// import oneMeal from '../../cypress/mocks/oneMeal';
import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';

// import mockFetch from '../../cypress/mocks/fetch';
// const oneMeal = require('../mocks/oneMeal');
// const foodDetails = oneMeal.meals[0];

jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    meals.meals[0],
  ),

}));

// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve(
//     drinks,
//   ),
// }));

describe('Teste da página Receitas Feitas', () => {
  it('Verifica a existencia de um header', () => {
    const { getByTestId } = renderWithRouter(<RecipeDetails />);
    const header = getByTestId('header-details');
    expect(header).toBeInTheDocument();
  });

  it('Verifica se o botão de share é renderizado', () => {
    const { getByTestId } = renderWithRouter(<RecipeDetails />);
    const shareBtn = getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
  });

  it('Verifica se o botão de favoritar é renderizado', () => {
    const { getByTestId } = renderWithRouter(<RecipeDetails />);
    const favBtn = getByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
  });

  it('Verifica se a receita é renderizada', () => {
    const { getByTestId } = renderWithRouter(<RecipeDetails />);
    const recipeTitle = getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeThumb = getByTestId('recipe-photo');
    expect(recipeThumb).toBeInTheDocument();

    const recipeCategory = getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const instructions = getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  it('Vefica se o botão de iniciar Receita é renderizado', async () => {
    renderWithRouter(<RecipeDetails />);
    const btn = screen.getByTestId('start-recipe-btn');
    expect(btn.textContent).toBe('Iniciar Receita');
    // fireEvent.click(btn);
    // expect(history.location.pathname).toBe('/comidas/52771');
  });

  // it('Vefica se o video é renderizado', async () => {
  //   const { getByTestId } = renderWithRouter(<RecipeDetails />, '/comidas/52771');

  //   expect(history.location.pathname).toBe('/comidas/52771');

  //   await act(async () => {
  //     const video = getByTestId('video');
  //     expect(video).toBeInTheDocument();
  //   });
  // });
});
