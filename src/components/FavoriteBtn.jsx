import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ id }) {
  const { data, typeFunc } = useContext(FetchContext);
  const [favorite, setFavorite] = useState(false);

  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (recipesFavorite !== null) {
      recipesFavorite.map((recipe) => recipe.id === id && setFavorite(true));
    }
  }, [recipesFavorite, id]);

  const favoriteBtn = () => {
    setFavorite(!favorite);

    if (favorite) {
      recipesFavorite.map((res, ind) => res.id === id && recipesFavorite.splice(ind, 1));

      return localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorite));
    }

    let newFavorite = [];
    if (typeFunc === 'meals') {
      newFavorite = [
        ...recipesFavorite,
        {
          id: data[0].idMeal,
          type: 'comida',
          area: data[0].strArea,
          category: data[0].strCategory,
          alcoholicOrNot: '',
          name: data[0].strMeal,
          image: data[0].strMealThumb,
        },
      ];
    } else {
      newFavorite = [
        ...recipesFavorite,
        {
          id: data[0].idDrink,
          type: 'bebida',
          area: '',
          category: data[0].strCategory,
          alcoholicOrNot: data[0].strAlcoholic,
          name: data[0].strDrink,
          image: data[0].strDrinkThumb,
        },
      ];
    }

    return localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  return (
    <button type="button" onClick={ favoriteBtn }>
      <img
        data-testid="favorite-btn"
        type="button"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt="botão de favoritar"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FavoriteBtn;
