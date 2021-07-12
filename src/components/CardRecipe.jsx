import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FetchContext from '../context/FetchContext';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import RenderIngredients from './RenderIngredients';

function CardRecipe({ id }) {
  const { data, imgRecipes, nameRecipes, ingredient } = useContext(FetchContext);

  const progressObject = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (progressObject === null) {
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  if (recipesFavorite === null) {
    const favoriteRecipes = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  return (
    <div>
      {
        data.map((recipe) => (
          <div key={ recipe }>
            <img data-testid="recipe-photo" src={ recipe[imgRecipes] } alt="" />
            <h2 data-testid="recipe-title">{ recipe[nameRecipes] }</h2>
            <ShareBtn id={ id } />
            <FavoriteBtn id={ id } />
            <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
            <ul>
              {/* { renderCheckbox() } */}
              <RenderIngredients id={ id } />
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <Link to="/receitas-feitas">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ ingredient.filter((res) => res).length !== ingredient.length }
              >
                Finalizar Receita
              </button>
            </Link>
          </div>
        ))
      }
    </div>
  );
}

CardRecipe.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CardRecipe;
