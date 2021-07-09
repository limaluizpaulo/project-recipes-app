import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import RecipesContext from '../Context/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function ReceitasFavoritas() {
  const { favoriteFilters } = useContext(RecipesContext);

  const [stateChangeHeart, setStateChangeHeart] = useState(true);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  const removeFavorited = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.filter((element) => element.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterLocalStorage));
    }
  };

  const verifyHeart = () => {
    const favorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorited) {
      const filterLocalStorage = favorited.some((element) => element.id === id);
      if (filterLocalStorage) {
        setStateChangeHeart(false);
      }
    }
  };

  useEffect(verifyHeart, []);

  return (
    <>
      <Header />
      <FiltersButtons />
      {favoriteFilters.map(({ image, category, name, id: idFavorite, area }, index) => (
        <div key={ idFavorite }>
          <img
            src={ image }
            alt="xxxx"
            data-testid={ `${index}-horizontal-image` }
            width="50px"
          />
          <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
          <span data-testid={ `${index}-horizontal-top-text` }>{ category }</span>
          <span>{ area }</span>
          <ShareButton index={ index } />
          <FavoriteButton
            stateChangeHeart={ stateChangeHeart }
            setStateChangeHeart={ setStateChangeHeart }
            removeFavorited={ removeFavorited }
          />
        </div>
      ))}
    </>

  );
}

export default ReceitasFavoritas;

// imagem, texto de categoria, nome, alcaholicOrNot (é pra dizer se é alcólico ou não )
