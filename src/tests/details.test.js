import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import RecipeDetails from '../components/RecipeDetails';

import {
  recipeDetails, recipes, pathname, bebidaId, btnVisible, btnMessage, drinksById,
} from '../mocks/detailsMocks';

describe('Details page', () => {
  it('Recipe details item', async () => {
    renderWithRouterAndRedux(
      <RecipeDetails
        recipeDetails={ recipeDetails }
        title="Bebidas"
        recipes={ recipes }
        link={ pathname }
        id={ bebidaId }
        btnVisible={ btnVisible }
        btnMessage={ btnMessage }
        drinksById={ drinksById }
      />,
      {
        initialEntries: ['/bebidas'],
      },
    );

    // navigator.clipboard = {
    //   writeText: jest.fn(),
    // };

    const drinkImage = screen.getByAltText(/Absolutly Screwed Up/i);
    expect(drinkImage.src).toContain('https://www.thecocktaildb.com/images/media/drink/yvxrwv1472669728.jpg');

    const title = screen.getByText(/Absolutly Screwed Up/i);
    expect(title).toBeInTheDocument();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    // https://cursos.alura.com.br/forum/topico-como-testar-o-que-tem-na-area-de-transferencia-e-um-select-multiplo-150788
    // userEvent.click(shareButton);
    // expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    // const copiedLinkSpan = screen.getByText(/Link copiado/i);
    // await waitFor(() => expect(copiedLinkSpan).toBeInTheDocument());

    const likeButton = screen.getByTestId('favorite-btn');
    expect(likeButton.src).toContain('http://localhost/whiteHeartIcon.svg');
    userEvent.click(likeButton);
    expect(likeButton.src).toContain('http://localhost/blackHeartIcon.svg');

    const alcoholic = screen.getByText('Alcoholic');
    const categoria = screen.getByText('Cocktail');
    expect(alcoholic).toBeInTheDocument();
    expect(categoria).toBeInTheDocument();

    const ingredientes = screen.getAllByTestId(/ingredient-name-and-measure/i);
    const ingredientesLength = 4;
    expect(ingredientes.length).toBe(ingredientesLength);

    const startButton = screen.getByTestId('start-recipe-btn');
    expect(startButton).toBeInTheDocument();
    // userEvent.click(startButton);
    // expect(history.location.pathname).toBe('/bebidas/16134/in-progress');
  });
});
