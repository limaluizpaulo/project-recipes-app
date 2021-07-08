import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Favorite from '../pages/Favorites';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

describe('Teste da página Receitas Faviritas', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

  test('Verifica o título da página', () => {
    const { getByText } = renderWithRouter(<Favorite />);
    const title = getByText('Receitas Favoritas');
    expect(title).toBeInTheDocument();
  });

  test('Verifica se renderiza todos os cards favoritos', () => {
    const { getAllByTestId } = renderWithRouter(<Favorite />);
    const favoritesRecipes = getAllByTestId(/-horizontal-name/);
    expect(favoritesRecipes.length).toBe(2);
  });

  test('Testa botão de filtro - All', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<Favorite />);
    const btnAll = getByTestId('filter-by-all-btn');
    fireEvent.click(btnAll);
    const favoritesRecipes = getAllByTestId(/-horizontal-name/);
    expect(favoritesRecipes.length).toBe(2);
  });

  test('Testa botão de filtro - Food', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<Favorite />);
    const btnFood = getByTestId('filter-by-food-btn');
    fireEvent.click(btnFood);
    const favoritesRecipes = getAllByTestId(/-horizontal-name/);
    expect(favoritesRecipes.length).toBe(1);
  });

  test('Testa botão de filtro - Drinks', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<Favorite />);
    const btnDrinks = getByTestId('filter-by-drink-btn');
    fireEvent.click(btnDrinks);
    const favoritesRecipes = getAllByTestId(/-horizontal-name/);
    expect(favoritesRecipes.length).toBe(1);
  });
});
