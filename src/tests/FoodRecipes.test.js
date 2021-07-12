import React from 'react';
import App from '../App';
import { requestMeal } from '../services/api';
import meals from './mock/FoodRecipes/data1';
import renderWithRoute from './renderWithRoute';

jest.mock('../services/api');

describe('renders the cards in display', () => {
  it('should renders the cards', () => {
    const { history } = renderWithRoute(<App />);
    history.push('/comidas');

    requestMeal.mockResolvedValue(meals);
  });
});
