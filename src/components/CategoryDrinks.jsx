import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { fetchDrinkCategori, fetchTypeCategoryFilter,
  fetchAllDrinks } from '../Service/drinkApi';
import RecipesContext from '../Context/RecipesContext';

export default function CategoryDrinks() {
  const {
    categoryDrink,
    setCategoryDrink,
    setResponseApiLupaDrink, setRedirect } = useContext(RecipesContext);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [valor, setValor] = useState('');
  const getApiCategory = () => {
    const FIVE = 5;
    fetchDrinkCategori()
      .then((result) => setCategoryDrink(result.filter((e, index) => index < FIVE)));
  };
  useEffect(getApiCategory, []);

  const handleAll = () => {
    fetchAllDrinks().then((result) => setResponseApiLupaDrink(result));
  };

  const handleClick = ({ target: { value } }) => {
    setValor(value);
    setRedirect(false);
    if (!toggleSearch || (valor !== value)) {
      fetchTypeCategoryFilter(value).then((result) => setResponseApiLupaDrink(result));
      setToggleSearch(true);
    } else {
      fetchAllDrinks().then((result) => setResponseApiLupaDrink(result));
      setToggleSearch(false);
    }
  };

  return (
    <main className="filter-buttons">
      {categoryDrink.map(({ strCategory }, index) => (
        <Button
          variant="outline-light"
          type="button"
          value={ strCategory }
          key={ index }
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
