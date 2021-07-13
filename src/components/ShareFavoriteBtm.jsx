import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import FetchContext from '../context/FetchContext';
import ShareBtn from './ShareBtn';

function ShareFavoriteBtm({ id, data }) {
  const { typeFunc } = useContext(FetchContext);
  const [favorite, setFavorite] = useState(false);

  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (recipesFavorite === null) {
    const favoriteRecipes = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  useEffect(() => {
    if (recipesFavorite !== null) {
      recipesFavorite.map((recipe) => recipe.id === id && setFavorite(true));
    }
  }, [recipesFavorite, id]);

  const headleFavorite = () => {
    setFavorite(!favorite);

    if (favorite) {
      recipesFavorite
        .map((res, ind) => res.id === id && recipesFavorite.splice(ind, 1));

      return localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorite));
    }

    let newFavorite = [];
    if (typeFunc === 'meals') {
      newFavorite = [
        ...recipesFavorite,
        {
          id: data.idMeal,
          type: 'comida',
          area: data.strArea,
          category: data.strCategory,
          alcoholicOrNot: '',
          name: data.strMeal,
          image: data.strMealThumb,
        },
      ];
    } else {
      newFavorite = [
        ...recipesFavorite,
        {
          id: data.idDrink,
          type: 'bebida',
          area: '',
          category: data.strCategory,
          alcoholicOrNot: data.strAlcoholic,
          name: data.strDrink,
          image: data.strDrinkThumb,
        },
      ];
    }

    return localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  return (
    <div>
      <ShareBtn id={ id } />
      <button type="button" onClick={ headleFavorite }>
        <img
          data-testid="favorite-btn"
          type="button"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="botão de favoritar"
        />
      </button>
    </div>
  );
}

ShareFavoriteBtm.propTypes = {
  match: PropTypes.object,
}.isrequired;

export default ShareFavoriteBtm;
