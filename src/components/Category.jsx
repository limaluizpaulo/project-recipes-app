import React, { useContext, useState } from 'react';
import FetchContext from '../context/FetchContext';
import {
  filterCategoryMeals,
  filterCategoryDrinks, fetchRecipesList, fetchDrinksList } from '../services/Api';
import '../App.css';

function Category() {
  const { categories, setData, typeFunc } = useContext(FetchContext);
  const [filters, setFilters] = useState('');

  const handleClick = ({ target: { value } }) => {
    setFilters(value);
    if (filters !== value) {
      if (typeFunc === 'comidas') {
        return filterCategoryMeals(value).then((res) => setData(res));
      }
      return filterCategoryDrinks(value).then((res) => setData(res));
    }

    if (typeFunc === 'comidas') {
      return fetchRecipesList().then((res) => setData(res));
    }
    return fetchDrinksList().then((res) => setData(res));
  };

  const FOUR = 4;

  return (
    <div>
      {
        categories.filter((el, index) => index <= FOUR)
          .map((category, index) => (
            <button
              className="category"
              type="button"
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              value={ category.strCategory }
              onClick={ handleClick }
            >
              {category.strCategory}

            </button>
          ))
      }
    </div>
  );
}

export default Category;
