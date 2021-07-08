import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
// import meals from '../../cypress/mocks/meals';
// import beefMeals from '../../cypress/mocks/beefMeals';
// import breakfastMeals from '../../cypress/mocks/breakfastMeals';
// import Header from '../components/Header';
// import App from '../App';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
});

describe('Testes da página principal de receitas', () => {
  it('Verifica se renderiza 12 cards, header, footer e botões de filtro', async () => {
    const NUM = 12;
    await act(async () => {
      renderWithRouter(

        <Recipes />,

        {
          route: '/comidas',
        },
      );
    });
    const mainCards = screen.getAllByTestId(/-recipe-card/i);
    expect(mainCards.length).toBe(NUM);

    // verifica a existencia de um header

    const header = screen.getByTestId('header-top');
    expect(header).toBeInTheDocument();

    // Verifica a existencia de um footer

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    // verifica a existencia de botões de filtros
  });
});
