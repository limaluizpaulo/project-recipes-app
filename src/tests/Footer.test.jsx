import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Footer from '../components/Footer';

const testIdDrink = 'drinks-bottom-btn';
const testIdMeal = 'food-bottom-btn';
const testIdExplore = 'explore-bottom-btn';

describe('1 - Tests the Footer buttons', () => {
  test('Tests if the Drink button exists', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const buttonDrink = getByTestId(testIdDrink);
    expect(buttonDrink).toBeInTheDocument();
  });
  test('Tests if the Meal button exists', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const buttonMeal = getByTestId(testIdMeal);
    expect(buttonMeal).toBeInTheDocument();
  });
  test('Tests if the Explore button exists', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const buttonExplore = getByTestId(testIdExplore);
    expect(buttonExplore).toBeInTheDocument();
  });
});
