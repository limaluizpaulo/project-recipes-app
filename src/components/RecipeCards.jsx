import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCards({ history, recipes }) {
  const { pathname } = history.location;
  const newLocation = pathname.includes('comidas') ? 'comidas' : 'bebidas';
  return (
    <section>
      {recipes.map((
        { strMealThumb, strDrinkThumb, strMeal, strDrink, idMeal, idDrink },
        idx,
      ) => (
        <Link to={ `/${newLocation}/${idMeal || idDrink}` } key={ idx }>
          <section
            data-testid={ `${idx}-recipe-card` }
          >
            <img
              src={ strMealThumb || strDrinkThumb }
              alt={ `Imagem do prato ${strMeal || strDrink}` }
              data-testid={ `${idx}-card-img` }
            />
            <span data-testid={ `${idx}-card-name` }>{strMeal || strDrink}</span>
          </section>
        </Link>
      ))}
    </section>
  );
}

RecipeCards.propTypes = {
  history: PropTypes.object,
  recipes: PropTypes.arrayOf,
}.isRequired;

export default RecipeCards;
