import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { statusButton, doneRecipes } from '../mocks/doneRecipesMock';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import DoneRecipesCard from '../components/DoneRecipeCard';

describe('Teste da página doneRecipes', () => {
  it('DoneRecipesButtons', () => {
    renderWithRouterAndRedux(<DoneRecipesButtons statusButton={ statusButton } />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    const FoodBtn = screen.getByTestId('filter-by-food-btn');
    const DrinkBtn = screen.getByTestId('filter-by-drink-btn');

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

  it('Testa DoneRecipeCard', () => {
    renderWithRouterAndRedux(
      <DoneRecipesCard
        recipe={ doneRecipes[0] }
        index={ 0 }
      />,
    );

    const cardImg = screen.getByAltText('Kumpir');
    expect(cardImg.src).toContain('https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg');

    const cardTitle = screen.getByText('Kumpir');
    expect(cardTitle).toBeInTheDocument();

    const cardSubtitle = screen.getByText('Turkish - Side');
    expect(cardSubtitle).toBeInTheDocument();

    const doneDate = screen.getByText('7/7/2021');
    expect(doneDate).toBeInTheDocument();

    const shareBtn = screen.getByAltText('shareIcon');
    expect(shareBtn.src).toContain('http://localhost/shareIcon.svg');
    // userEvent.click(shareBtn);
  });
});
