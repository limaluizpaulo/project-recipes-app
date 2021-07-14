import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { statusButton, doneRecipes, removeFavoriteRecipe,
} from '../mocks/doneRecipesMock';
import FavoriteRecipesCard from '../components/FavoriteRecipeCard';

describe('Teste da página favorite Recipes', () => {
  it('testa o pathname', () => {
    renderWithRouterAndRedux(
      <FavoriteRecipes location="/receitas-favoritas" />,
    );
  });

  it('testa os favorite buttons', () => {
    renderWithRouterAndRedux(
      <FavoriteRecipes location="/receitas-favoritas" />,
    );

    const allBtn = screen.getByRole('button', { name: 'All' });
    const FoodBtn = screen.getByRole('button', { name: 'Food' });
    const DrinkBtn = screen.getByRole('button', { name: 'Drink' });

    expect(allBtn).toBeInTheDocument();
    expect(FoodBtn).toBeInTheDocument();
    expect(DrinkBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    expect(statusButton('all').length).toBe(2);

    userEvent.click(FoodBtn);
    expect(statusButton('Food').length).toBe(1);

    userEvent.click(DrinkBtn);
    expect(statusButton('Drink').length).toBe(1);
  });

  it('Testa FavoriteRecipeCard', () => {
    renderWithRouterAndRedux(
      <FavoriteRecipesCard
        location="/receitas-favoritas"
        recipe={ doneRecipes[0] }
        index={ 0 }
        removeFavoriteRecipe={ removeFavoriteRecipe }
      />,
    );

    const cardImg = screen.getByAltText('Kumpir');
    expect(cardImg.src).toContain('https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg');

    const cardTitle = screen.getByText('Kumpir');
    expect(cardTitle).toBeInTheDocument();

    const cardSubtitle = screen.getByText('Turkish - Side');
    expect(cardSubtitle).toBeInTheDocument();

    const favoriteBtn = screen.getByAltText('favoriteIcon');
    expect(favoriteBtn.src).toContain('http://localhost/blackHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(removeFavoriteRecipe(0).length).toBe(1);

    const shareBtn = screen.getByAltText('shareIcon');
    expect(shareBtn.src).toContain('http://localhost/shareIcon.svg');
    // userEvent.click(shareBtn);
  });
});
