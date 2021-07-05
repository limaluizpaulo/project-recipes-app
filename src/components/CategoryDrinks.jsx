import React, { useContext, useEffect } from 'react';
import { fetchDrinkCategori, fetchTypeCategoryFilter } from '../Service/drinkApi';
import RecipesContext from '../Context/RecipesContext';

export default function CategoryDrinks() {
  const {
    categoryDrink,
    setCategoryDrink,
    setResponseApiLupaDrink, setRedirect } = useContext(RecipesContext);
  const getApiCategory = () => {
    const FIVE = 5;
    fetchDrinkCategori()
      .then((result) => setCategoryDrink(result.filter((e, index) => index < FIVE)));
  };
  useEffect(getApiCategory, []);

  const handleClick = ({ target: { value } }) => {
    setRedirect(false);
    fetchTypeCategoryFilter(value).then((result) => setResponseApiLupaDrink(result));
  };

  return (
    <div>
      {categoryDrink.map(({ strCategory }) => (
        <button
          type="button"
          value={ strCategory }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </button>))}
    </div>
  );
}
