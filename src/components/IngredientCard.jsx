import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import DrinksContext from '../context/DrinksContext';

import '../styles/IngredientCard.css';

function IngredientCard({ index, ingredient }) {
  const { location: { pathname } } = useHistory();
  const history = useHistory();
  const { filterRecipesByIngredient, setIsFiltred } = useContext(RecipesContext);

  const { filterDrinksByIngredient, setIsFiltred: setIsFiltredDrinks,
  } = useContext(DrinksContext);

  function redirectToRecipes() {
    filterRecipesByIngredient(ingredient);
    setIsFiltred(true);
    history.push('/comidas');
  }

  function redirectToDrinks() {
    filterDrinksByIngredient(ingredient);
    setIsFiltredDrinks(true);
    history.push('/bebidas');
  }

  function renderRecipes() {
    return (
      <div className="card-field">
        <button
          className="card-button"
          data-testid={ `${index}-ingredient-card` }
          type="button"
          onClick={ () => redirectToRecipes() }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
            alt={ ingredient }
          />
          <h6 data-testid={ `${index}-card-name` }>{ingredient}</h6>
        </button>
      </div>
    );
  }

  function renderDrinks() {
    return (
      <div>
        <button
          data-testid={ `${index}-ingredient-card` }
          type="button"
          onClick={ () => redirectToDrinks() }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
            alt={ ingredient }
          />
          <h6 data-testid={ `${index}-card-name` }>{ingredient}</h6>
        </button>
      </div>
    );
  }
  return (

    <section>
      {
        pathname.includes('/comidas')
          ? renderRecipes()
          : renderDrinks()
      }
    </section>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default IngredientCard;
