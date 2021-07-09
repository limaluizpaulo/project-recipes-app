import React, { useContext, useEffect } from 'react';
import RecipesContext from '../Context/RecipesContext';

export default function FiltersButtons() {
  const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { setFavoriteFilters } = useContext(RecipesContext);

  const filterFood = () => {
    const filter = favoriteRecipesStorage.filter(({ type }) => type === 'comida');
    setFavoriteFilters(filter);
  };

  const filterDrink = () => {
    const filterDrinks = favoriteRecipesStorage.filter(({ type }) => type === 'bebida');
    setFavoriteFilters(filterDrinks);
  };

  const filterAll = () => {
    const filters = favoriteRecipesStorage;
    setFavoriteFilters(filters);
  };

  useEffect(filterAll, []);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterFood }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrink }
      >
        Drinks

      </button>
    </div>
  );
}
