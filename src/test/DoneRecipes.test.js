import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Teste da página Receitas Feitas', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  test('Verifica se os cards são renderizados', () => {
    const { getByText } = renderWithRouter(<DoneRecipes />);
    const title = getByText('Receitas Feitas');
    expect(title).toBeInTheDocument();
  });

  test('Verifica se renderiza todos os cards de receita', () => {
    const { getAllByTestId } = renderWithRouter(<DoneRecipes />);
    const recipes = getAllByTestId(/-horizontal-done-date/);
    expect(recipes.length).toBe(2);
  });

  test('Testa botão de filtro - All', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<DoneRecipes />);
    const btnAll = getByTestId('filter-by-all-btn');
    fireEvent.click(btnAll);
    const recipes = getAllByTestId(/-horizontal-done-date/);
    expect(recipes.length).toBe(2);
  });

  test('Testa botão de filtro - Food', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<DoneRecipes />);
    const btnFood = getByTestId('filter-by-food-btn');
    fireEvent.click(btnFood);
    const recipes = getAllByTestId(/-horizontal-done-date/);
    expect(recipes.length).toBe(1);
  });

  test('Testa botão de filtro - Drinks', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<DoneRecipes />);
    const btnDrinks = getByTestId('filter-by-drink-btn');
    fireEvent.click(btnDrinks);
    const recipes = getAllByTestId(/-horizontal-done-date/);
    expect(recipes.length).toBe(1);
  });
});
