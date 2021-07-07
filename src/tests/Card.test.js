import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Card from '../components/Card';
import renderWithRouter from '../renderWithRouter';

const ID_DRINK = 15997;
const RECIPE = {
  idMeal: 52952,
  strMealThumb: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
  strMeal: 'Beef Lo Mein',
};

describe('Checks Card', () => {
  it('Check if the component has a div with your atributes', () => {
    renderWithRouter(
      <Card
        drink={ ID_DRINK }
        recipe={ RECIPE }
        index={ 0 }
      />,
    );

    const linkRecipe = screen.getByTestId('0-recipe-card');
    expect(linkRecipe).toBeInTheDocument();
  });
});
