import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/Context';

const RenderMealIngredient = () => {
  const {
    filterDrinksIngredients,
  } = useContext(RecipeContext);

  function mealIngredient() {
    return filterDrinksIngredients.map((itemAll, indexAll) => (
      <Link
        className="food__card"
        key={ indexAll }
        data-testid={ `${indexAll}-recipe-card` }
        to={ `/comidas/${itemAll.idMeal}` }
      >
        <div className="food__card__img">
          <img
            src={ itemAll.strMealThumb }
            alt={ itemAll.strMealThumb }
            data-testid={ `${indexAll}-card-img` }
          />
        </div>
        <div className="food__card_text">
          <p data-testid={ `${indexAll}-card-name` }>{itemAll.strMeal}</p>
        </div>
      </Link>
    ));
  }

  return (
    <div className="foodPage">
      <div className="food__cards__container">
        {mealIngredient()}
      </div>
    </div>
  );
};

export default RenderMealIngredient;
