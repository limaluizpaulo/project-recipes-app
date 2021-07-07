import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/Context';

const RenderMealIngredient = () => {
  const {
    filterDrinksIngredients,
  } = useContext(RecipeContext);

  function mealIngredient() {
    return filterDrinksIngredients.map((itemAll, indexAll) => (
      <div key={ indexAll } data-testid={ `${indexAll}-recipe-card` }>
        <Link to={ `/comidas/${itemAll.idMeal}` }>
          <p data-testid={ `${indexAll}-card-name` }>{itemAll.strMeal}</p>
          <img
            src={ itemAll.strMealThumb }
            alt={ itemAll.strMealThumb }
            data-testid={ `${indexAll}-card-img` }
          />
        </Link>
      </div>
    ));
  }

  return (
    <div>
      {mealIngredient()}
    </div>
  );
};

export default RenderMealIngredient;
