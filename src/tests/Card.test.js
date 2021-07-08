import { screen } from '@testing-library/react';
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
  it('Check if the component has a div drinks with your atributes', () => {
    const { history } = renderWithRouter(
      <Card
        drink={ ID_DRINK }
        recipe={ RECIPE }
        index={ 0 }
      />,
    );

    history.push('/bebidas');
    const linkRecipe = screen.getByTestId('0-recipe-card');
    console.log(linkRecipe.childNodes);
    screen.debug();
    expect(linkRecipe).toBeInTheDocument();
  });

  it('Check if the component has a div food with your atributes', () => {
    const { history } = renderWithRouter(
      <Card
        drink={ ID_DRINK }
        recipe={ RECIPE }
        index={ 0 }
      />,
    );

    history.push('/comidas');
    const linkRecipe = screen.getByTestId('0-recipe-card');
    expect(linkRecipe).toBeInTheDocument();
  });
});
