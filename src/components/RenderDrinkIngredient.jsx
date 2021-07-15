import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/Context';

const RenderDrinkIngredient = () => {
  const {
    filterDrinksIngredients,
  } = useContext(RecipeContext);

  function drinksIngredients() {
    return filterDrinksIngredients.map((itemAll, indexAll) => (
      <Link
        className="food__card"
        to={ `/bebidas/${itemAll.idDrink}` }
        key={ indexAll }
        data-testid={ `${indexAll}-recipe-card` }
      >
        <div className="food__card__img">
          <img
            src={ itemAll.strDrinkThumb }
            alt={ itemAll.strDrinkThumb }
            data-testid={ `${indexAll}-card-img` }
          />
        </div>
        <div className="food__card_text">
          <p data-testid={ `${indexAll}-card-name` }>{itemAll.strDrink}</p>
        </div>
      </Link>
    ));
  }
  return (
    <div className="foodPage">
      <div className="food__cards__container">
        {drinksIngredients()}
      </div>
    </div>
  );
};

export default RenderDrinkIngredient;
