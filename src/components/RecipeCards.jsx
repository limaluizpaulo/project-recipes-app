import React from 'react';
import PropTypes from 'prop-types';

function RecipeCards({ history, recipes }) {
  const { pathname } = history.location;
  return (
    <section>
      {recipes.map((
        { strMealThumb, strDrinkThumb, strMeal, strDrink, idMeal, idDrink },
        idx,
      ) => (
        <section
          key={ idx }
          data-testid={ `${idx}-recipe-card` }
          onClick={ () => history.push(`${pathname}/${idMeal || idDrink}`) }
          onKeyDown={ () => history.push(`${pathname}/${idMeal || idDrink}`) }
          role="button"
          tabIndex={ 0 }
        >
          <img
            src={ strMealThumb || strDrinkThumb }
            alt={ `Imagem do prato ${strMeal || strDrink}` }
            data-testid={ `${idx}-card-img` }
          />
          <span data-testid={ `${idx}-card-name` }>{strMeal || strDrink}</span>
        </section>
      ))}
    </section>
  );
}

RecipeCards.propTypes = {
  history: PropTypes.object,
  recipes: PropTypes.arrayOf,
}.isRequired;

export default RecipeCards;
