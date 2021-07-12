import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import RecipeDetails from '../components/RecipeDetails';

describe('Details page', () => {
  it('Recipe details item', () => {
    const recipeDetails = [
      {
        idDrink: '16134',
        strDrink: 'Absolutly Screwed Up',
        strDrinkAlternate: null,
        strTags: null,
        strVideo: null,
        strCategory: 'Cocktail',
        strAlcoholic: 'Alcoholic',
        strInstructions: 'Shake it up it tasts better that way...',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yvxrwv1472669728.jpg',
        strIngredient1: 'Absolut Citron',
        strIngredient2: 'Orange juice',
        strIngredient3: 'Triple sec',
        strIngredient4: 'Ginger ale',
        strMeasure1: '1 shot',
        strMeasure2: '1 shot ',
        strMeasure3: '1 shot ',
        strMeasure4: 'Fill to top',
      },
    ];

    const recipes = [
      {
        idMeal: '52977',
        strMeal: 'Corba',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        idMeal: '52978',
        strMeal: 'Kumpir',
        strMealThumb: 'http://www.turkeysforlife.com/2013/10/firinda-kumpir-turkish-street-food.html',
      },
      {
        idMeal: '53026',
        strMeal: 'Tamiya',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
      },
      {
        idMeal: '52785',
        strMeal: 'Dal fry',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
      },
      {
        idMeal: '52804',
        strMeal: 'Poutine',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
      },
      {
        idMeal: '52844',
        strMeal: 'Lasagne',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
      },
    ];

    renderWithRouterAndRedux(
      <RecipeDetails
        recipeDetails={ recipeDetails }
        title="Bebidas"
        recipes={ recipes }
        // link={ pathname }
        // id={ bebidaId }
        // btnVisible={ btnVisible }
        // btnMessage={ btnMessage }
      />,
      {
        initialEntries: ['/bebidas'],
      },
    );

    const drinkImage = screen.getByAltText(/Absolutly Screwed Up/i);
    expect(drinkImage.src).toContain('https://www.thecocktaildb.com/images/media/drink/yvxrwv1472669728.jpg');
  });
});
