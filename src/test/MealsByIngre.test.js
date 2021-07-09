// import { fireEvent } from '@testing-library/dom';
import React from 'react';
import MealsByIngre from '../pages/MealsByIngre';
import renderWithRouter from './renderWithRouter';
import meals from './mocks/mealsIngre';
import { fetchIngreMeals, fetchMealsByName } from '../services/mealsApi';

jest.mock('../services/mealsApi');

describe('Teste página MealsByIngre', () => {
  fetchIngreMeals.mockResolvedValue(meals);
  fetchMealsByName.mockResolvedValue(meals);
  it('Testa se o título esta correto', () => {
    const { getByTestId } = renderWithRouter(<MealsByIngre />);

    const titulo = getByTestId('page-title');
    expect(titulo.textContent).toBe('Explorar Ingredientes');
  });
  it('Testa se todos os componentes existem na página', async () => {
    const { findByTestId } = renderWithRouter(<MealsByIngre />);
    const ingreCard0 = await findByTestId('0-ingredient-card');
    const imgCard0 = await findByTestId('0-card-img');
    const nameCard0 = await findByTestId('0-card-name');
    expect(ingreCard0).toBeInTheDocument();
    expect(imgCard0).toBeInTheDocument();
    expect(nameCard0).toBeInTheDocument();

    const ingreCard11 = await findByTestId('1-ingredient-card');
    const imgCard11 = await findByTestId('1-card-img');
    const nameCard11 = await findByTestId('1-card-name');
    expect(ingreCard11).toBeInTheDocument();
    expect(imgCard11).toBeInTheDocument();
    expect(nameCard11).toBeInTheDocument();
  });
});
