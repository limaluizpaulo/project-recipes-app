import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchRecipesById } from '../services/recipesAPI';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './style/MealsInProgress.css';

const copy = require('clipboard-copy');

function MealsInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState(false);
  const [isFav, setIsFav] = useState();

  const getDetailsRecipes = async () => {
    const request = await fetchRecipesById(id, 'meals');
    setRecipe(request);
    console.log(request);
  };

  useEffect(() => {
    const arrayOfRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (arrayOfRecipes) {
      const found = arrayOfRecipes.find((element) => (
        element.id === id
      ));
      if (found) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFavorite = () => {
    const objRecipe = {
      id,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };

    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = !local ? [] : local;
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, objRecipe]));
    setIsFav(true);
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRecipes = favoriteRecipes.filter(({ id: toRemoveId }) => id !== toRemoveId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    setIsFav(false);
  };

  function addOrRemoveFavorite() {
    if (isFav) {
      removeFavorite();
    } else {
      addFavorite();
    }
  }

  const shareClick = () => {
    copy(`http://localhost:3000/comidas/${id}`);
    // setCopyLink('Link copiado!');
  };

  useEffect(() => {
    getDetailsRecipes();
  }, []);

  return (
    recipe && (
      <div>

        <h1 data-testid="recipe-title">
          { recipe.strMeal }
        </h1>
        <img
          className="recipe-photo"
          src={ recipe.strMealThumb }
          alt={ recipe.strMeal }
          data-testid="recipe-photo"
        />
        <button
          type="button"
          onClick={ () => shareClick() }
        >
          <img
            src={ shareIcon }
            alt="shareIcon"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          onClick={ () => addOrRemoveFavorite() }
        >
          <img
            src={ isFav ? blackHeartIcon : whiteHeartIcon }
            alt="favoriteIcon"
            data-testid="favorite-btn"
          />
        </button>

      </div>
    )
  );
}

export default MealsInProgress;

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
