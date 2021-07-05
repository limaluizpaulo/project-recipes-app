import React, { useContext, useEffect } from 'react';
import { fetchDrinkCategori } from '../Service/drinkApi';
import RecipesContext from '../Context/RecipesContext';

export default function CategoryDrinks() {
  const { categoryDrink, setCategoryDrink } = useContext(RecipesContext);
  const getApiCategory = () => {
    const FIVE = 5;
    fetchDrinkCategori()
      .then((result) => setCategoryDrink(result.filter((e, index) => index < FIVE)));
  };
  useEffect(getApiCategory, []);

  return (
    <div>
      {categoryDrink.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>))}
    </div>
  );
}
