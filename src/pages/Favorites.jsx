import React, { useState } from 'react';
import Header from '../components/Header';
import DoneAndFavorite from '../components/DoneAndFavorite';
import BtnsFilters from '../components/BtnsFilters';
import ShareBtn from '../components/ShareBtn';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function Favorites() {
  const [value, setValue] = useState();
  const [fav, setFav] = useState(true);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const handleFavorite = (item) => {
    if (favoriteRecipes.length) {
      const arr = favoriteRecipes.filter((elem) => elem.id !== item.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
      setFav(!fav);
    }
  };

  const renderRecipe = () => {
    if (value === 'All') return favoriteRecipes;
    if (value === 'Food') {
      return favoriteRecipes
        .filter((recipe) => recipe.type === 'comida');
    }
    if (value === 'Drinks') {
      return favoriteRecipes
        .filter((recipe) => recipe.type === 'bebida');
    }

    return favoriteRecipes;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <BtnsFilters setValue={ setValue } />
      {renderRecipe().map((item, index) => (
        <div key={ item.id }>
          <DoneAndFavorite item={ item } index={ index } />
          <ShareBtn recipe={ item } index={ index } doneRecipe />
          <button
            type="button"
            onClick={ () => handleFavorite(item) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>

        </div>

      ))}
    </div>
  );
}
