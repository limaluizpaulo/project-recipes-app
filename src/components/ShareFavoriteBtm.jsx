import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ShareFavoriteBtm({ url, pageFoods, id, data, pageDrinks }) {
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

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
    if (pageFoods) {
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
    } if (pageDrinks) {
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
      <button
        type="button"
        onClick={ () => navigator.clipboard.writeText(`http://localhost:3000${url}`) && setShare(true) }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Copiar Link"
        />
      </button>
      {share ? <p>Link copiado!</p> : null}
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
