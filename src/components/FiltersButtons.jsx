import React, { useContext } from 'react';
import RecipesContext from '../Context/RecipesContext';

export default function FiltersButtons() {
  const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { favoriteFilters, setFavoriteFilters } = useContext(RecipesContext);

  const filterFood = () => {
    const filter = favoriteRecipesStorage.filter(({ type }) => type === 'comida');
    setFavoriteFilters(filter);
    console.log(filter);
  };

  const filterDrink = () => {
    const filterDrinks = favoriteRecipesStorage.filter(({ type }) => type === 'bebida');
    setFavoriteFilters(filterDrinks);
    console.log(filterDrinks);
  };

  const filterAll = () => {
    const filters = favoriteRecipesStorage.filter(
      ({ type }) => type === 'comida' && type === 'bebida',
    );
    setFavoriteFilters(filters);
    console.log(filters);
  };

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
