import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/Context';

const RenderDrinkIngredient = () => {
  const {
    filterDrinksIngredients,
  } = useContext(RecipeContext);

  function drinksIngredients() {
    return filterDrinksIngredients.map((itemAll, indexAll) => (
      <div key={ indexAll } data-testid={ `${indexAll}-recipe-card` }>
        <Link to={ `/bebidas/${itemAll.idDrink}` }>
          <p data-testid={ `${indexAll}-card-name` }>{itemAll.strDrink}</p>
          <img
            src={ itemAll.strDrinkThumb }
            alt={ itemAll.strDrinkThumb }
            data-testid={ `${indexAll}-card-img` }
          />
        </Link>
      </div>
    ));
  }
  return (
    <div>
      {drinksIngredients()}
    </div>
  );
};

export default RenderDrinkIngredient;
