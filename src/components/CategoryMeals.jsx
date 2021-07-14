import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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
  const handleAll = () => {
    fetchAllMeals().then((result) => setResponseApiLupaMeal(result));
  };

  const getApiCategory = () => {
    const FIVE = 5;
    fetchMealsCategory().then((result) => setCategoryMeals(result
      .filter((_e, index) => index < FIVE)));
  };
  useEffect(getApiCategory, []);
  return (
    <main className="filter-buttons">
      {categoryMeals.map(({ strCategory }) => (
        <Button
          variant="outline-light"
          type="button"
          value={ strCategory }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {strCategory}
        </Button>))}
      <Button
        variant="outline-danger"
        type="button"
        onClick={ handleAll }
        data-testid="All-category-filter"
      >
        All
      </Button>
    </main>
  );
}
