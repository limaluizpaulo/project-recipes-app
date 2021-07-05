import React, { useContext, useEffect, useState } from 'react';
import { fetchMealsCategory, fetchTypeCotegoryMeals,
  fetchAllMeals } from '../Service/foodApi';
import RecipesContext from '../Context/RecipesContext';

export default function CategoryMeals() {
  const { categoryMeals, setCategoryMeals,
    setResponseApiLupaMeal, setRedirect } = useContext(RecipesContext);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [valor, setValor] = useState('');
  const handleClick = ({ target: { value } }) => {
    setValor(value);
    setRedirect(false);
    if (!toggleSearch || (valor !== value)) {
      fetchTypeCotegoryMeals(value).then((result) => setResponseApiLupaMeal(result));
      setToggleSearch(true);
    } else {
      fetchAllMeals().then((result) => setResponseApiLupaMeal(result));
      setToggleSearch(false);
    }
  };

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
          value={ strCategory }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </button>))}
    </>
  );
}
