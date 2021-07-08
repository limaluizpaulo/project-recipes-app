import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';
import meals from '../mocks/meals';
import MealsContextProvider from '../context/mealsContext';
import DrinksContextProvider from '../context/drinksContext';
import Header from '../components/Header';
import App from '../App';

describe('Testes da página principal de receitas', () => {
  test('verifica se a página Comidas é renderizada', () => {
    const { getByText, getByTestId, history, container } = renderWithRouter(<Recipes />, { route: '/comidas' });

    // const title = getByText('Comidas');
    const title = getByTestId('page-title');
    // const title = getByText('Comidas');
    // history.push('/comidas');

    // expect(title).toBeInTheDocument();
    // expect(history.location.pathname).toBe('/comidas');
    expect(title.textContent).toBe('Comidas');
  });
});
