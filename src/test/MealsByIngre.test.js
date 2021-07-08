// import { fireEvent } from '@testing-library/dom';
import React from 'react';
import MealsByIngre from '../pages/MealsByIngre';
import renderWithRouter from './renderWithRouter';
import meals from './mocks/mealsIngre';
import { fetchIngreMeals } from '../services/mealsApi';

describe('Teste página MealsByIngre', () => {
  it('Testa se o título esta correto', () => {
    const { getByTestId } = renderWithRouter(<MealsByIngre />);
    const titulo = getByTestId('page-title');
    expect(titulo.textContent).toBe('Explorar Ingredientes');
  });
  it('Testa se todos os componentes existem na página', async () => {
    // const response = { json: jest.fn().mockResolvedValue(mealsIngre) };
    // global.fetch = jest.fn().mockResolvedValue(response);
    // console.log(response);
    jest.mock('fetchIngreMeals');
    const resp = { json: meals };
    fetchIngreMeals.get.mockResolvedValue(resp);
    const { findByTestId } = renderWithRouter(<MealsByIngre />);
    // const IngreCard = await findByTestId('-ingredient-card');
    // const ImgCard = await findByTestId('-card-img');
    // const NameCard = await findByTestId('-card-name');
    // expect().toBeInTheDocument();
    // expect().toBeInTheDocument();
    // expect().toBeInTheDocument();

    const chickenIngreCard = await findByTestId('0-ingredient-card');
    const chickenImgCard = await findByTestId('0-card-img');
    const chickenNameCard = await findByTestId('0-card-name');
    expect(chickenIngreCard).toBeInTheDocument();
    expect(chickenImgCard).toBeInTheDocument();
    expect(chickenNameCard).toBeInTheDocument();

    // const salmonIngreCard = await findByTestId('1-ingredient-card');
    // const salmonImgCard = await findByTestId('1-card-img');
    // const salmonNameCard = await findByTestId('1-card-name');
    // expect(salmonIngreCard).toBeInTheDocument();
    // expect(salmonImgCard).toBeInTheDocument();
    // expect(salmonNameCard).toBeInTheDocument();
  });
});
