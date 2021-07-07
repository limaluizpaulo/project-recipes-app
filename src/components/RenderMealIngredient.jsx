import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/Context';

const RenderMealIngredient = () => {
  const {
    filterDrinksIngredients,
  } = useContext(RecipeContext);

  return filterDrinksIngredients.map((itemAll, indexAll) => (
    <div
      className="food__card"
      key={ indexAll }
      data-testid={ `${indexAll}-recipe-card` }
    >
      <Link to={ `/comidas/${itemAll.idMeal}` }>
        <img
          src={ itemAll.strMealThumb }
          alt={ itemAll.strMealThumb }
          data-testid={ `${indexAll}-card-img` }
        />
        <p data-testid={ `${indexAll}-card-name` }>{itemAll.strMeal}</p>
      </Link>
    </div>
  ));
};

export default RenderMealIngredient;
