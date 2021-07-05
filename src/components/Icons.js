import React, { useState } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/global.css';

function Icons(item) {
  const [changeIcon, setChangeIcon] = useState(true);
  const [changeCopy, setChangeCopy] = useState(false);

  function copyClipboard() {
    const url = document.URL;
    navigator.clipboard.writeText(url);
    setChangeCopy(!changeCopy);
  }

  function favorite() {
    setChangeIcon(!changeIcon);
    const
      { idMeal,
        strArea,
        idDrink,
        strCategory,
        strAlcoholic, strDrink, strMeal, strMealThumb, strDrinkThumb } = item.code;

    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteElement = {
      id: idMeal || idDrink,
      type: idMeal === undefined ? 'bebida' : 'comida',
      area: idMeal === undefined ? '' : strArea,
      category: strCategory,
      alcoholicOrNot: idMeal === undefined ? strAlcoholic : '',
      name: strDrink || strMeal,
      image: strMealThumb || strDrinkThumb,
    };
    let isFavoriteBefore = 0;
    favorites.forEach((fav) => { isFavoriteBefore += fav.id === favoriteElement.id; });

    favorites = favorites.filter((fav) => fav.id !== favoriteElement.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

    if (changeIcon) {
      if (isFavoriteBefore === 0) favorites = [...favorites, favoriteElement];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }
  }

  return (
    <div>
      <div className="shareAndLike">
        <button
          type="button"
          className="share"
          onClick={ copyClipboard }
        >
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          className="favorite"
          onClick={ () => favorite() }
        >
          <img
            src={ changeIcon ? whiteHeartIcon : blackHeartIcon }
            alt="favorite icons"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      { changeCopy }
    </div>
  );
}

export default Icons;
