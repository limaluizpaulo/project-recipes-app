import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/contextRecipes';

function DrinkCategoryButtons() {
  const { setDrinks,
    drinkCategoryName, setDrinkCategoryName, setToggleFood,
    toggleFood } = useContext(ContextRecipes);
  const maxLength = 4;

  const fetchDrinkCategories = (category) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => setDrinks(results.drinks))
      .catch((error) => console.log(error));
  };

  const fetchDrinkRecipes = () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setDrinks(results.drinks)));
  };

  const handleClick = (category) => {
    if (toggleFood === false) {
      fetchDrinkCategories(category);
      setToggleFood(true);
    } else {
      setToggleFood(false);
      fetchDrinkRecipes();
    }
  };

  const fetchDrinkCategoryName = () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setDrinkCategoryName(results.drinks)));
  };

  useEffect(() => {
    fetchDrinkCategoryName();
  }, []);

  const handleClickAll = () => {
    fetchDrinkRecipes();
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickAll }
        data-testid="All-category-filter"
      >
        All
      </button>
      {drinkCategoryName.map(({ strCategory }, index) => index <= maxLength && (
        <button
          key={ index }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default DrinkCategoryButtons;
