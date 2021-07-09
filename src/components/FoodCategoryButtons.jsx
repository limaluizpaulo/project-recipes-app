import React, { useContext, useEffect } from 'react';
import ContextRecipes from '../context/contextRecipes';

function FoodCategoryButtons() {
  const { setRecipes,
    foodCategoryName, setFoodCategoryName } = useContext(ContextRecipes);
  const maxLength = 4;

  const fetchFoodCategories = (category) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((results) => setRecipes(results.meals))
      .catch((error) => console.log(error));
  };

  const handleClick = (category) => fetchFoodCategories(category);

  const fetchFoodCategoryName = () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetch(endpoint)
      .then((response) => response.json()
        .then((results) => setFoodCategoryName(results.meals)));
  };

  useEffect(() => {
    fetchFoodCategoryName();
  }, []);

  return (
    <div>
      <button type="button">All</button>
      {foodCategoryName.map(({ strCategory }, index) => index <= maxLength && (
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

export default FoodCategoryButtons;
