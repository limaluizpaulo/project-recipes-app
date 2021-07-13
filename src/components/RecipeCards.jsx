import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/recipescards.css';

function RecipeCards({ history, recipes }) {
  const { pathname } = history.location;
  const newLocation = pathname.includes('comidas') ? 'comidas' : 'bebidas';
  return (
    <section className="recipe-card-container">
      {recipes.map((
        { strMealThumb, strDrinkThumb, strMeal, strDrink, idMeal, idDrink },
        idx,
      ) => (
        <Link to={ `/${newLocation}/${idMeal || idDrink}` } key={ idx }>
          <section
            data-testid={ `${idx}-recipe-card` }
            className="recipe-card"
          >
            <img
              src={ strMealThumb || strDrinkThumb }
              alt={ `Imagem do prato ${strMeal || strDrink}` }
              data-testid={ `${idx}-card-img` }
            />
            <span
              data-testid={ `${idx}-card-name` }
              className="recipe-title"
            >
              {strMeal || strDrink}
            </span>
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
