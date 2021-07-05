import React, { useContext, useEffect } from 'react';
import { fetchMealsCategory } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

export default function CategoryMeals() {
  const { categoryMeals, setCategoryMeals } = useContext(RecipesContext);
  const getApiCategory = () => {
    const FIVE = 5;
    fetchMealsCategory().then((result) => setCategoryMeals(result
      .filter((_e, index) => index < FIVE)));
  };
  useEffect(getApiCategory, []);
  return (
    <>
      {categoryMeals.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>))}
    </>
  );
}
